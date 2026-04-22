import { Router, Response } from 'express';
import { query } from '../db';
import { authenticate, authorize, AuthRequest } from '../auth';

const router = Router();
router.use(authenticate);

// GET /api/students — list (manager/teacher sees all, parent sees own children)
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { role, userId } = req.user!;
    let result;

    if (role === 'manager') {
      result = await query(`
        SELECT s.id, s.student_number, s.is_active, u.name_ar, u.name_en, u.email,
               g.name_ar AS grade_ar, g.name_en AS grade_en, sec.name_ar AS section_ar
        FROM students s
        JOIN users u ON s.user_id = u.id
        LEFT JOIN sections sec ON s.section_id = sec.id
        LEFT JOIN grades g ON sec.grade_id = g.id
        ORDER BY g.level, u.name_ar
      `);
    } else if (role === 'teacher') {
      result = await query(`
        SELECT DISTINCT s.id, s.student_number, u.name_ar, u.name_en,
               g.name_ar AS grade_ar, sec.name_ar AS section_ar
        FROM students s
        JOIN users u ON s.user_id = u.id
        JOIN sections sec ON s.section_id = sec.id
        JOIN grades g ON sec.grade_id = g.id
        JOIN teacher_sections ts ON ts.section_id = sec.id
        JOIN teachers t ON ts.teacher_id = t.id
        WHERE t.user_id = $1
        ORDER BY u.name_ar
      `, [userId]);
    } else if (role === 'parent') {
      result = await query(`
        SELECT s.id, s.student_number, u.name_ar, u.name_en,
               g.name_ar AS grade_ar, sec.name_ar AS section_ar
        FROM students s
        JOIN users u ON s.user_id = u.id
        JOIN parent_students ps ON ps.student_id = s.id
        JOIN parents p ON ps.parent_id = p.id
        LEFT JOIN sections sec ON s.section_id = sec.id
        LEFT JOIN grades g ON sec.grade_id = g.id
        WHERE p.user_id = $1
      `, [userId]);
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/students/:id
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(`
      SELECT s.*, u.name_ar, u.name_en, u.email, u.phone,
             g.name_ar AS grade_ar, g.name_en AS grade_en,
             sec.name_ar AS section_ar, sec.name_en AS section_en
      FROM students s
      JOIN users u ON s.user_id = u.id
      LEFT JOIN sections sec ON s.section_id = sec.id
      LEFT JOIN grades g ON sec.grade_id = g.id
      WHERE s.id = $1
    `, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/students — create (manager only)
router.post('/', authorize('manager'), async (req: AuthRequest, res: Response) => {
  try {
    const { nameAr, nameEn, email, sectionId, dateOfBirth, studentNumber } = req.body;
    // Create user first
    const userResult = await query(
      `INSERT INTO users (email, role, name_ar, name_en) VALUES ($1, 'student', $2, $3) RETURNING id`,
      [email, nameAr, nameEn]
    );
    const userId = userResult.rows[0].id;

    const studentResult = await query(
      `INSERT INTO students (user_id, student_number, section_id, date_of_birth)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, studentNumber, sectionId, dateOfBirth]
    );
    res.status(201).json(studentResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
