import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import studentRoutes from './routes/students';
import attendanceRoutes from './routes/attendance';
import hifzRoutes from './routes/hifz';
import financeRoutes, { donationRouter } from './routes/finance';
import messageRoutes from './routes/messages';
import registrationRoutes from './routes/registrations';
import scheduleRoutes from './routes/schedule';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// One-time migration runner — remove after 003 is applied
app.post('/api/run-migration', async (_req, res) => {
  const secret = _req.headers['x-migration-secret'];
  if (secret !== process.env.JWT_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const { pool } = require('./db');
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'registration_type') THEN
          CREATE TYPE registration_type AS ENUM ('student', 'adult');
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'registration_status') THEN
          CREATE TYPE registration_status AS ENUM ('pending', 'reviewed', 'accepted', 'rejected');
        END IF;
      END $$;

      CREATE TABLE IF NOT EXISTS registrations (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        type registration_type NOT NULL,
        status registration_status NOT NULL DEFAULT 'pending',
        name VARCHAR(255) NOT NULL,
        birth_date DATE NOT NULL,
        gender VARCHAR(10) NOT NULL,
        class_level VARCHAR(10),
        father_phone VARCHAR(30),
        mother_phone VARCHAR(30),
        payment_challenge TEXT,
        health_notes TEXT,
        phone VARCHAR(30),
        hifz_level VARCHAR(30),
        tajwid VARCHAR(20),
        tafsir VARCHAR(20),
        reviewed_by UUID REFERENCES users(id),
        reviewed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
      CREATE INDEX IF NOT EXISTS idx_registrations_type ON registrations(type);
      CREATE INDEX IF NOT EXISTS idx_registrations_created ON registrations(created_at DESC);
    `);
    res.json({ status: 'Migration 003 applied successfully' });
  } catch (err: any) {
    console.error('Migration error:', err);
    res.status(500).json({ error: err.message, detail: (err as any).detail });
  }
});

// Diagnostic — remove after debugging
app.get('/api/db-check', async (_req, res) => {
  const secret = _req.headers['x-migration-secret'];
  if (secret !== process.env.JWT_SECRET) return res.status(403).json({ error: 'Forbidden' });
  try {
    const { pool } = require('./db');
    const types = await pool.query("SELECT typname FROM pg_type WHERE typname IN ('registration_type','registration_status')");
    const tables = await pool.query("SELECT tablename FROM pg_tables WHERE tablename = 'registrations'");
    const ext = await pool.query("SELECT extname FROM pg_extension WHERE extname = 'uuid-ossp'");
    res.json({ types: types.rows, tables: tables.rows, extensions: ext.rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/hifz', hifzRoutes);
app.use('/api/payments', financeRoutes);
app.use('/api/donations', donationRouter);
app.use('/api/messages', messageRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/schedule', scheduleRoutes);

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Almohajirin API running on port ${PORT}`);
});

export default app;
