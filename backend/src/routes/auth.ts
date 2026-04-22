import { Router, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { query } from '../db';
import {
  comparePassword, generateAccessToken, generateRefreshToken,
  storeRefreshToken, validateRefreshToken, verifyRefreshToken,
  revokeUserTokens, hashPassword, authenticate, AuthRequest,
} from '../auth';

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
};

const router = Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /api/auth/login — email + password
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const result = await query(
      'SELECT id, email, password_hash, role, name_ar, name_en FROM users WHERE email = $1 AND is_active = true',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    if (!user.password_hash) {
      return res.status(401).json({ error: 'Account uses Google sign-in only' });
    }

    const valid = await comparePassword(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = { userId: user.id, role: user.role, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    await storeRefreshToken(user.id, refreshToken);

    // Update last login
    await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    res.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        nameAr: user.name_ar,
        nameEn: user.name_en,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/google — Google SSO
router.post('/google', async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: 'Google credential required' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const googlePayload = ticket.getPayload();
    if (!googlePayload?.email) {
      return res.status(401).json({ error: 'Invalid Google token' });
    }

    // Find or create user
    let result = await query(
      'SELECT id, email, google_id, role, name_ar, name_en FROM users WHERE google_id = $1 OR email = $2',
      [googlePayload.sub, googlePayload.email]
    );

    let user;
    if (result.rows.length === 0) {
      // New user — default to parent role (admin can change later)
      const newUser = await query(
        `INSERT INTO users (email, google_id, role, name_ar, name_en, avatar_url)
         VALUES ($1, $2, 'parent', $3, $3, $4)
         RETURNING id, email, role, name_ar, name_en`,
        [googlePayload.email, googlePayload.sub, googlePayload.name || googlePayload.email, googlePayload.picture]
      );
      user = newUser.rows[0];

      // Auto-create parent record
      await query('INSERT INTO parents (user_id) VALUES ($1)', [user.id]);
    } else {
      user = result.rows[0];
      // Link Google ID if not already linked
      if (!user.google_id) {
        await query('UPDATE users SET google_id = $1 WHERE id = $2', [googlePayload.sub, user.id]);
      }
    }

    await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    const payload = { userId: user.id, role: user.role, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    await storeRefreshToken(user.id, refreshToken);

    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    res.json({
      accessToken,
      user: { id: user.id, email: user.email, role: user.role, nameAr: user.name_ar, nameEn: user.name_en },
    });
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/refresh — refresh access token (reads HttpOnly cookie)
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token' });
    }

    const decoded = verifyRefreshToken(refreshToken);

    // Validate token exists in DB (not revoked, not expired)
    const valid = await validateRefreshToken(decoded.userId, refreshToken);
    if (!valid) {
      res.clearCookie('refreshToken', { path: '/' });
      return res.status(401).json({ error: 'Refresh token invalid or revoked' });
    }

    // Verify user still active
    const result = await query(
      'SELECT id, email, role FROM users WHERE id = $1 AND is_active = true',
      [decoded.userId]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }

    const user = result.rows[0];
    const payload = { userId: user.id, role: user.role, email: user.email };

    // Rotate: revoke old token, issue new one
    await revokeUserTokens(user.id);
    const newRefreshToken = generateRefreshToken(payload);
    await storeRefreshToken(user.id, newRefreshToken);
    res.cookie('refreshToken', newRefreshToken, COOKIE_OPTS);

    res.json({ accessToken: generateAccessToken(payload) });
  } catch {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// POST /api/auth/logout
router.post('/logout', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user) {
      await revokeUserTokens(req.user.userId);
    }
    res.clearCookie('refreshToken', { path: '/' });
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/auth/me — current user profile
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      'SELECT id, email, role, name_ar, name_en, phone, avatar_url FROM users WHERE id = $1',
      [req.user!.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const u = result.rows[0];
    res.json({ id: u.id, email: u.email, role: u.role, nameAr: u.name_ar, nameEn: u.name_en, phone: u.phone, avatarUrl: u.avatar_url });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
