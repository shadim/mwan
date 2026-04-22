import { Router, Response } from 'express';
import { query } from '../db';
import { authenticate, authorize, AuthRequest } from '../auth';

const router = Router();
router.use(authenticate);

// GET /api/attendance?sectionId=&date=
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { role, userId } = req.user!;
    const { sectionId, date, studentId } = req.query;

    let sql = `
      SELECT a.*, u.name_ar, u.name_en, s.student_number
      FROM attendance a
      JOIN students s ON a.student_id = s.id
      JOIN users u ON s.user_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let idx = 1;

    // Role-scoped constraints
    if (role === 'teacher') {
      // Only sections this teacher is assigned to
      sql += ` AND EXISTS (
        SELECT 1 FROM teacher_sections ts JOIN teachers t ON ts.teacher_id = t.id
        WHERE ts.section_id = a.section_id AND t.user_id = $${idx++}
      )`;
      params.push(userId);
    } else if (role === 'parent') {
      // Only own children
      sql += ` AND EXISTS (
        SELECT 1 FROM parent_students ps JOIN parents p ON ps.parent_id = p.id
        WHERE ps.student_id = a.student_id AND p.user_id = $${idx++}
      )`;
      params.push(userId);
    } else if (role === 'student') {
      // Only self
      sql += ` AND s.user_id = $${idx++}`;
      params.push(userId);
    }
    // manager: no extra constraint

    if (sectionId) { sql += ` AND a.section_id = $${idx++}`; params.push(sectionId); }
    if (date) { sql += ` AND a.date = $${idx++}`; params.push(date); }
    if (studentId) { sql += ` AND a.student_id = $${idx++}`; params.push(studentId); }

    sql += ' ORDER BY u.name_ar';
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/attendance — batch record (teacher/manager)
router.post('/', authorize('teacher', 'manager'), async (req: AuthRequest, res: Response) => {
  try {
    const { sectionId, date, records } = req.body;
    // records: [{ studentId, status, notes? }]
    if (!Array.isArray(records) || !sectionId || !date) {
      return res.status(400).json({ error: 'sectionId, date, and records[] required' });
    }

    const results = [];
    for (const r of records) {
      const result = await query(`
        INSERT INTO attendance (student_id, section_id, date, status, recorded_by, notes)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (student_id, date)
        DO UPDATE SET status = $4, recorded_by = $5, notes = $6
        RETURNING *
      `, [r.studentId, sectionId, date, r.status, req.user!.userId, r.notes || null]);
      results.push(result.rows[0]);
    }

    res.json({ saved: results.length, records: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/attendance/stats?sectionId=&days=7
router.get('/stats', async (req: AuthRequest, res: Response) => {
  try {
    const { sectionId, days = 7 } = req.query;
    const result = await query(`
      SELECT a.date,
        COUNT(*) FILTER (WHERE a.status = 'present') AS present,
        COUNT(*) FILTER (WHERE a.status = 'late') AS late,
        COUNT(*) FILTER (WHERE a.status = 'absent') AS absent,
        COUNT(*) AS total
      FROM attendance a
      WHERE a.section_id = $1
        AND a.date >= CURRENT_DATE - ($2 || ' days')::INTERVAL
      GROUP BY a.date
      ORDER BY a.date
    `, [sectionId, days]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
