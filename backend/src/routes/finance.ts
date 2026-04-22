import { Router, Response } from 'express';
import { query } from '../db';
import { authenticate, authorize, AuthRequest } from '../auth';

const router = Router();
router.use(authenticate);

// GET /api/payments?studentId=
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { role, userId } = req.user!;
    const { studentId } = req.query;
    let sql: string;
    let params: any[];

    if (role === 'parent') {
      sql = `
        SELECT p.*, u.name_ar AS student_name_ar, u.name_en AS student_name_en
        FROM payments p
        JOIN students s ON p.student_id = s.id
        JOIN users u ON s.user_id = u.id
        JOIN parent_students ps ON ps.student_id = s.id
        JOIN parents par ON ps.parent_id = par.id
        WHERE par.user_id = $1
        ORDER BY p.created_at DESC
      `;
      params = [userId];
    } else if (studentId) {
      sql = `SELECT * FROM payments WHERE student_id = $1 ORDER BY created_at DESC`;
      params = [studentId];
    } else {
      sql = `
        SELECT p.*, u.name_ar AS student_name_ar
        FROM payments p
        JOIN students s ON p.student_id = s.id
        JOIN users u ON s.user_id = u.id
        ORDER BY p.created_at DESC LIMIT 50
      `;
      params = [];
    }

    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/payments — record payment (manager)
router.post('/', authorize('manager'), async (req: AuthRequest, res: Response) => {
  try {
    const { studentId, amount, month, paymentMethod } = req.body;
    const result = await query(`
      INSERT INTO payments (student_id, amount, month, status, payment_method, paid_at)
      VALUES ($1, $2, $3, 'paid', $4, NOW())
      RETURNING *
    `, [studentId, amount, month, paymentMethod]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/donations
router.get('/donations', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(`
      SELECT * FROM donations ORDER BY created_at DESC LIMIT 50
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/donations — public donation (no auth required for this one)
export const donationRouter = Router();
donationRouter.post('/', async (req: any, res: Response) => {
  try {
    const { donorNameAr, donorNameEn, donorEmail, donorPhone, amount, purpose, isAnonymous } = req.body;
    const result = await query(`
      INSERT INTO donations (donor_name_ar, donor_name_en, donor_email, donor_phone, amount, purpose, is_anonymous)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [donorNameAr, donorNameEn, donorEmail, donorPhone, amount, purpose || 'general', isAnonymous || false]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
