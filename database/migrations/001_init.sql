-- Almohajirin wel Ansar — Initial Database Schema
-- PostgreSQL 15+

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role AS ENUM ('manager', 'teacher', 'student', 'parent');
CREATE TYPE attendance_status AS ENUM ('present', 'late', 'absent', 'excused');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'overdue', 'partial');
CREATE TYPE assignment_status AS ENUM ('assigned', 'submitted', 'graded', 'late');
CREATE TYPE surah_status AS ENUM ('locked', 'in_progress', 'memorized', 'reviewed');
CREATE TYPE message_status AS ENUM ('unread', 'read', 'archived');
CREATE TYPE donation_purpose AS ENUM ('zakat', 'building_campaign', 'student_sponsorship', 'general', 'sadaqah');

-- ============================================================
-- USERS & AUTH
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255), -- NULL if Google SSO only
  google_id VARCHAR(255) UNIQUE,
  role user_role NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  phone VARCHAR(30),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_hash ON refresh_tokens(token_hash);

-- ============================================================
-- ACADEMIC STRUCTURE
-- ============================================================
CREATE TABLE academic_years (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar VARCHAR(100) NOT NULL, -- e.g. '١٤٤٧ هـ'
  name_en VARCHAR(100),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar VARCHAR(100) NOT NULL, -- e.g. 'الصف الرابع'
  name_en VARCHAR(100),
  level INT NOT NULL, -- 1-6
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grade_id UUID NOT NULL REFERENCES grades(id),
  name_ar VARCHAR(50) NOT NULL, -- e.g. 'شعبة أ'
  name_en VARCHAR(50),
  academic_year_id UUID NOT NULL REFERENCES academic_years(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar VARCHAR(100) NOT NULL,
  name_en VARCHAR(100),
  category VARCHAR(50), -- 'quran', 'islamic', 'science', 'language'
  weekly_hours DECIMAL(3,1),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TEACHERS
-- ============================================================
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  specialization_ar VARCHAR(255),
  specialization_en VARCHAR(255),
  years_experience INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE teacher_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id),
  academic_year_id UUID NOT NULL REFERENCES academic_years(id),
  UNIQUE(teacher_id, section_id, subject_id, academic_year_id)
);

-- ============================================================
-- STUDENTS
-- ============================================================
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_number VARCHAR(20) UNIQUE NOT NULL,
  section_id UUID REFERENCES sections(id),
  date_of_birth DATE,
  enrollment_date DATE DEFAULT CURRENT_DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PARENTS
-- ============================================================
CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE parent_students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  relationship VARCHAR(50), -- 'father', 'mother', 'guardian'
  UNIQUE(parent_id, student_id)
);

-- ============================================================
-- ATTENDANCE
-- ============================================================
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES sections(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status attendance_status NOT NULL DEFAULT 'present',
  recorded_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, date)
);

CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_section_date ON attendance(section_id, date);

-- ============================================================
-- QURAN / HIFZ TRACKING
-- ============================================================
CREATE TABLE hifz_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  surah_number INT NOT NULL, -- 1-114
  surah_name_ar VARCHAR(50) NOT NULL,
  surah_name_en VARCHAR(50),
  status surah_status DEFAULT 'locked',
  started_at DATE,
  completed_at DATE,
  reviewed_by UUID REFERENCES teachers(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, surah_number)
);

CREATE TABLE hifz_streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID UNIQUE NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_activity_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ASSIGNMENTS & GRADES
-- ============================================================
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID NOT NULL REFERENCES teachers(id),
  section_id UUID NOT NULL REFERENCES sections(id),
  subject_id UUID NOT NULL REFERENCES subjects(id),
  title_ar VARCHAR(255) NOT NULL,
  title_en VARCHAR(255),
  description_ar TEXT,
  description_en TEXT,
  due_date DATE NOT NULL,
  max_score DECIMAL(5,2) DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  status assignment_status DEFAULT 'assigned',
  score DECIMAL(5,2),
  feedback_ar TEXT,
  feedback_en TEXT,
  submitted_at TIMESTAMPTZ,
  graded_at TIMESTAMPTZ,
  graded_by UUID REFERENCES teachers(id),
  UNIQUE(assignment_id, student_id)
);

-- ============================================================
-- EVALUATIONS / REPORT CARDS
-- ============================================================
CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id),
  academic_year_id UUID NOT NULL REFERENCES academic_years(id),
  term INT NOT NULL, -- 1 or 2
  grade_ar VARCHAR(50), -- 'ممتاز', 'جيد جداً'
  grade_en VARCHAR(50),
  score DECIMAL(5,2),
  teacher_id UUID REFERENCES teachers(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, subject_id, academic_year_id, term)
);

-- ============================================================
-- MESSAGING
-- ============================================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES users(id),
  recipient_id UUID NOT NULL REFERENCES users(id),
  subject VARCHAR(255),
  body TEXT NOT NULL,
  status message_status DEFAULT 'unread',
  parent_message_id UUID REFERENCES messages(id), -- for threads
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_recipient ON messages(recipient_id, status);
CREATE INDEX idx_messages_sender ON messages(sender_id);

-- ============================================================
-- FINANCE
-- ============================================================
CREATE TABLE fee_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year_id UUID NOT NULL REFERENCES academic_years(id),
  grade_id UUID NOT NULL REFERENCES grades(id),
  monthly_amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'ILS',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id),
  parent_id UUID REFERENCES parents(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'ILS',
  month VARCHAR(50) NOT NULL, -- 'شعبان ١٤٤٧'
  status payment_status DEFAULT 'pending',
  payment_method VARCHAR(50),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status);

CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_name_ar VARCHAR(255),
  donor_name_en VARCHAR(255),
  donor_email VARCHAR(255),
  donor_phone VARCHAR(30),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'ILS',
  purpose donation_purpose DEFAULT 'general',
  is_anonymous BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CALENDAR / EVENTS
-- ============================================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_ar VARCHAR(255) NOT NULL,
  title_en VARCHAR(255),
  description_ar TEXT,
  description_en TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  event_type VARCHAR(50), -- 'academic', 'event', 'ceremony', 'religious', 'holiday'
  is_public BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SCHEDULE
-- ============================================================
CREATE TABLE schedule_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID NOT NULL REFERENCES sections(id),
  subject_id UUID NOT NULL REFERENCES subjects(id),
  teacher_id UUID NOT NULL REFERENCES teachers(id),
  day_of_week INT NOT NULL, -- 0=Sunday ... 4=Thursday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_hifz_progress_updated_at BEFORE UPDATE ON hifz_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_hifz_streaks_updated_at BEFORE UPDATE ON hifz_streaks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
