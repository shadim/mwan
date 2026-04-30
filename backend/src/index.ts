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
