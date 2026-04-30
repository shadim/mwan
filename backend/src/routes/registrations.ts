// Routes: POST /api/registrations
// Auth: PUBLIC — no auth required

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db';

const router = Router();

const phoneRegex = /^0\d{1,2}-?\d{3}-?\d{4}$/;

const baseSchema = z.object({
  name: z.string().min(1).refine(v => v.trim().split(/\s+/).length >= 3, {
    message: 'Full name required (at least 3 words)',
  }),
  birthDate: z.string().refine(v => {
    const d = new Date(v);
    return !isNaN(d.getTime()) && d < new Date();
  }, { message: 'Invalid date of birth' }),
  gender: z.enum(['male', 'female']),
});

const studentSchema = baseSchema.extend({
  type: z.literal('student'),
  classLevel: z.string().min(1),
  fatherPhone: z.string().regex(phoneRegex, 'Invalid phone number'),
  motherPhone: z.string().regex(phoneRegex).optional().or(z.literal('')),
  paymentChallenge: z.string().optional(),
  healthNotes: z.string().optional(),
});

const adultSchema = baseSchema.extend({
  type: z.literal('adult'),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  hifzLevel: z.enum(['none', 'few_surahs', '1_5_juz', '5_15_juz', '15_25_juz', '25_29_juz', 'full']),
  tajwid: z.enum(['', 'no', 'beginner', 'intermediate', 'advanced']).optional(),
  tafsir: z.enum(['', 'no', 'beginner', 'intermediate', 'advanced']).optional(),
});

const registrationSchema = z.discriminatedUnion('type', [studentSchema, adultSchema]);

// PUBLIC — no auth required
router.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = registrationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const data = parsed.data;

    if (data.type === 'student') {
      const result = await query(
        `INSERT INTO registrations
           (type, name, birth_date, gender, class_level, father_phone, mother_phone, payment_challenge, health_notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING id, created_at`,
        [
          data.type,
          data.name.trim(),
          data.birthDate,
          data.gender,
          data.classLevel,
          data.fatherPhone,
          data.motherPhone || null,
          data.paymentChallenge || null,
          data.healthNotes || null,
        ]
      );
      return res.status(201).json({
        id: result.rows[0].id,
        createdAt: result.rows[0].created_at,
      });
    } else {
      const result = await query(
        `INSERT INTO registrations
           (type, name, birth_date, gender, phone, hifz_level, tajwid, tafsir)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id, created_at`,
        [
          data.type,
          data.name.trim(),
          data.birthDate,
          data.gender,
          data.phone,
          data.hifzLevel,
          data.tajwid || null,
          data.tafsir || null,
        ]
      );
      return res.status(201).json({
        id: result.rows[0].id,
        createdAt: result.rows[0].created_at,
      });
    }
  } catch (err: any) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message || 'Internal server error', detail: err.detail });
  }
});

export default router;
