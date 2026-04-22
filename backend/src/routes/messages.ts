import { Router, Response } from 'express';
import { query } from '../db';
import { authenticate, AuthRequest } from '../auth';

const router = Router();
router.use(authenticate);

// GET /api/messages
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user!;
    const { folder = 'inbox' } = req.query;

    let sql: string;
    if (folder === 'sent') {
      sql = `
        SELECT m.*, u.name_ar AS sender_name_ar, u.name_en AS sender_name_en,
               r.name_ar AS recipient_name_ar, r.name_en AS recipient_name_en
        FROM messages m
        JOIN users u ON m.sender_id = u.id
        JOIN users r ON m.recipient_id = r.id
        WHERE m.sender_id = $1
        ORDER BY m.created_at DESC
      `;
    } else {
      sql = `
        SELECT m.*, u.name_ar AS sender_name_ar, u.name_en AS sender_name_en
        FROM messages m
        JOIN users u ON m.sender_id = u.id
        WHERE m.recipient_id = $1 AND m.status != 'archived'
        ORDER BY m.created_at DESC
      `;
    }

    const result = await query(sql, [userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/messages
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { recipientId, subject, body, parentMessageId } = req.body;
    const result = await query(`
      INSERT INTO messages (sender_id, recipient_id, subject, body, parent_message_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [req.user!.userId, recipientId, subject, body, parentMessageId || null]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/messages/:id/read
router.patch('/:id/read', async (req: AuthRequest, res: Response) => {
  try {
    await query(
      `UPDATE messages SET status = 'read' WHERE id = $1 AND recipient_id = $2`,
      [req.params.id, req.user!.userId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/messages/unread-count
router.get('/unread-count', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT COUNT(*) FROM messages WHERE recipient_id = $1 AND status = 'unread'`,
      [req.user!.userId]
    );
    res.json({ count: parseInt(result.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
