-- Migration: Add registrations table for public student/adult sign-up
-- Date: 2026-04-30
-- Depends on: 001_init.sql
-- Rollback: DROP TABLE IF EXISTS registrations; DROP TYPE IF EXISTS registration_type; DROP TYPE IF EXISTS registration_status;

CREATE TYPE registration_type AS ENUM ('student', 'adult');
CREATE TYPE registration_status AS ENUM ('pending', 'reviewed', 'accepted', 'rejected');

CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  type registration_type NOT NULL,
  status registration_status NOT NULL DEFAULT 'pending',

  -- Shared fields
  name VARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  gender VARCHAR(10) NOT NULL,

  -- Student-only (NULL when type = 'adult')
  class_level VARCHAR(10),
  father_phone VARCHAR(30),
  mother_phone VARCHAR(30),
  payment_challenge TEXT,
  health_notes TEXT,

  -- Adult-only (NULL when type = 'student')
  phone VARCHAR(30),
  hifz_level VARCHAR(30),
  tajwid VARCHAR(20),
  tafsir VARCHAR(20),

  -- Review workflow
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_type ON registrations(type);
CREATE INDEX idx_registrations_created ON registrations(created_at DESC);
