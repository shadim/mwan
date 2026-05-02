// Routes: POST /api/contact
// Auth: PUBLIC — no auth required

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { Resend } from 'resend';

const router = Router();

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  subject: z.enum(['general', 'register', 'donate']),
  message: z.string().min(1, 'Message is required'),
});

const SUBJECT_LABELS: Record<string, string> = {
  general: 'استفسار عام / General Inquiry',
  register: 'التسجيل / Registration',
  donate: 'التبرعات / Donations',
};

// PUBLIC — no auth required
router.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, email, phone, subject, message } = parsed.data;

    const { error } = await resend.emails.send({
      from: 'مدرسة الأنصار <onboarding@resend.dev>',
      to: 'almohagren96@gmail.com',
      replyTo: email,
      subject: `[تواصل] ${SUBJECT_LABELS[subject]} — ${name}`,
      html: `
        <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #2D9269;">رسالة جديدة من الموقع</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">الاسم:</td><td style="padding: 8px;">${name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">البريد:</td><td style="padding: 8px;">${email}</td></tr>
            ${phone ? `<tr><td style="padding: 8px; font-weight: bold; color: #555;">الهاتف:</td><td style="padding: 8px;">${phone}</td></tr>` : ''}
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">الموضوع:</td><td style="padding: 8px;">${SUBJECT_LABELS[subject]}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px; white-space: pre-wrap;">${message}</div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }

    res.json({ sent: true });
  } catch (err) {
    console.error('Contact email error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
