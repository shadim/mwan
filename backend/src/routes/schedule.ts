import { Router, Response } from 'express';
import { query } from '../db';
import { authenticate, authorize, AuthRequest } from '../auth';

const router = Router();
router.use(authenticate);

// GET /api/schedule?sectionId=&teacherId=
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { sectionId, teacherId } = req.query;
    let sql = `
      SELECT ss.*, s.name_ar AS subject_ar, s.name_en AS subject_en,
             sec.name_ar AS section_ar, g.name_ar AS grade_ar,
             u.name_ar AS teacher_name_ar
      FROM schedule_slots ss
      JOIN subjects s ON ss.subject_id = s.id
      JOIN sections sec ON ss.section_id = sec.id
      JOIN grades g ON sec.grade_id = g.id
      JOIN teachers t ON ss.teacher_id = t.id
      JOIN users u ON t.user_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let idx = 1;
    if (sectionId) { sql += ` AND ss.section_id = $${idx++}`; params.push(sectionId); }
    if (teacherId) { sql += ` AND ss.teacher_id = $${idx++}`; params.push(teacherId); }
    sql += ' ORDER BY ss.day_of_week, ss.start_time';

    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/schedule/events
router.get('/events', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(`
      SELECT * FROM events
      WHERE event_date >= CURRENT_DATE
      ORDER BY event_date, event_time
      LIMIT 20
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/events (manager only)
router.post('/events', authorize('manager'), async (req: AuthRequest, res: Response) => {
  try {
    const { titleAr, titleEn, descriptionAr, descriptionEn, eventDate, eventTime, eventType, isPublic } = req.body;
    const result = await query(`
      INSERT INTO events (title_ar, title_en, description_ar, description_en, event_date, event_time, event_type, is_public, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [titleAr, titleEn, descriptionAr, descriptionEn, eventDate, eventTime, eventType, isPublic ?? true, req.user!.userId]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
