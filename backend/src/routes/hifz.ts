import { Router, Response } from 'express';
import { query } from '../db';
import { authenticate, authorize, AuthRequest } from '../auth';

const router = Router();
router.use(authenticate);

// GET /api/hifz/:studentId
router.get('/:studentId', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(`
      SELECT hp.*, hs.current_streak, hs.longest_streak, hs.last_activity_date
      FROM hifz_progress hp
      LEFT JOIN hifz_streaks hs ON hs.student_id = hp.student_id
      WHERE hp.student_id = $1
      ORDER BY hp.surah_number DESC
    `, [req.params.studentId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/hifz/:studentId/:surahNumber — update status (teacher)
router.put('/:studentId/:surahNumber', authorize('teacher', 'manager'), async (req: AuthRequest, res: Response) => {
  try {
    const { status, notes } = req.body;
    const { studentId, surahNumber } = req.params;

    const result = await query(`
      UPDATE hifz_progress
      SET status = $1, notes = $2,
          started_at = CASE WHEN $1 = 'in_progress' AND started_at IS NULL THEN NOW() ELSE started_at END,
          completed_at = CASE WHEN $1 = 'memorized' THEN NOW() ELSE completed_at END
      WHERE student_id = $3 AND surah_number = $4
      RETURNING *
    `, [status, notes, studentId, surahNumber]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hifz record not found' });
    }

    // Update streak if memorized
    if (status === 'memorized' || status === 'in_progress') {
      await query(`
        INSERT INTO hifz_streaks (student_id, current_streak, longest_streak, last_activity_date)
        VALUES ($1, 1, 1, CURRENT_DATE)
        ON CONFLICT (student_id) DO UPDATE SET
          current_streak = CASE
            WHEN hifz_streaks.last_activity_date = CURRENT_DATE - 1 THEN hifz_streaks.current_streak + 1
            WHEN hifz_streaks.last_activity_date = CURRENT_DATE THEN hifz_streaks.current_streak
            ELSE 1
          END,
          longest_streak = GREATEST(
            hifz_streaks.longest_streak,
            CASE
              WHEN hifz_streaks.last_activity_date = CURRENT_DATE - 1 THEN hifz_streaks.current_streak + 1
              WHEN hifz_streaks.last_activity_date = CURRENT_DATE THEN hifz_streaks.current_streak
              ELSE 1
            END
          ),
          last_activity_date = CURRENT_DATE
      `, [studentId]);
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
