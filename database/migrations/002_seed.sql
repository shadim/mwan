-- Seed data for development
-- Passwords are bcrypt hashes of the plaintext shown in comments

-- Academic Year
INSERT INTO academic_years (id, name_ar, name_en, start_date, end_date, is_current) VALUES
  ('a0000000-0000-0000-0000-000000000001', '١٤٤٧ هـ', '2025-2026', '2025-09-01', '2026-06-30', true);

-- Grades
INSERT INTO grades (id, name_ar, name_en, level) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'الصف الأول', 'Grade 1', 1),
  ('b0000000-0000-0000-0000-000000000002', 'الصف الثاني', 'Grade 2', 2),
  ('b0000000-0000-0000-0000-000000000003', 'الصف الثالث', 'Grade 3', 3),
  ('b0000000-0000-0000-0000-000000000004', 'الصف الرابع', 'Grade 4', 4),
  ('b0000000-0000-0000-0000-000000000005', 'الصف الخامس', 'Grade 5', 5),
  ('b0000000-0000-0000-0000-000000000006', 'الصف السادس', 'Grade 6', 6);

-- Subjects
INSERT INTO subjects (id, name_ar, name_en, category, weekly_hours) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'تحفيظ القرآن', 'Quran Memorization', 'quran', 10),
  ('c0000000-0000-0000-0000-000000000002', 'التفسير', 'Tafsir', 'islamic', 3),
  ('c0000000-0000-0000-0000-000000000003', 'العقيدة', 'Aqeedah', 'islamic', 2),
  ('c0000000-0000-0000-0000-000000000004', 'الفقه', 'Fiqh', 'islamic', 2),
  ('c0000000-0000-0000-0000-000000000005', 'الحديث', 'Hadith', 'islamic', 1),
  ('c0000000-0000-0000-0000-000000000006', 'الرياضيات', 'Mathematics', 'science', 5),
  ('c0000000-0000-0000-0000-000000000007', 'العلوم', 'Science', 'science', 3),
  ('c0000000-0000-0000-0000-000000000008', 'اللغة العربية', 'Arabic Language', 'language', 3),
  ('c0000000-0000-0000-0000-000000000009', 'اللغة الإنجليزية', 'English Language', 'language', 2),
  ('c0000000-0000-0000-0000-000000000010', 'اللغة العبرية', 'Hebrew Language', 'language', 1);

-- Sections
INSERT INTO sections (id, grade_id, name_ar, name_en, academic_year_id) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000004', 'شعبة أ', 'Section A', 'a0000000-0000-0000-0000-000000000001'),
  ('d0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000004', 'شعبة ب', 'Section B', 'a0000000-0000-0000-0000-000000000001'),
  ('d0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000002', 'شعبة أ', 'Section A', 'a0000000-0000-0000-0000-000000000001');

-- Users (password: see README)
-- Hash for 'admin123':   $2a$10$8KzQ1QK5g5g5g5g5g5g5gOexamplehashnotreal1
-- Using crypt for seed — in production use bcrypt from app
INSERT INTO users (id, email, password_hash, role, name_ar, name_en, phone) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'manager@almohajirin.edu', crypt('admin123', gen_salt('bf')), 'manager', 'محمد عبدالله', 'Mohammed Abdullah', '04-623-8891'),
  ('e0000000-0000-0000-0000-000000000002', 'teacher@almohajirin.edu', crypt('teacher123', gen_salt('bf')), 'teacher', 'أحمد الفقيه', 'Ahmad Al-Faqih', '050-111-2222'),
  ('e0000000-0000-0000-0000-000000000003', 'parent@almohajirin.edu', crypt('parent123', gen_salt('bf')), 'parent', 'خالد عبدالله', 'Khalid Abdullah', '050-333-4444'),
  ('e0000000-0000-0000-0000-000000000004', 'student@almohajirin.edu', crypt('student123', gen_salt('bf')), 'student', 'عبدالله خالد', 'Abdullah Khalid', NULL),
  ('e0000000-0000-0000-0000-000000000005', 'teacher2@almohajirin.edu', crypt('teacher123', gen_salt('bf')), 'teacher', 'نور الهدى', 'Noor Al-Huda', '050-555-6666'),
  ('e0000000-0000-0000-0000-000000000006', 'student2@almohajirin.edu', crypt('student123', gen_salt('bf')), 'student', 'مريم خالد', 'Maryam Khalid', NULL);

-- Teachers
INSERT INTO teachers (id, user_id, specialization_ar, specialization_en, years_experience) VALUES
  ('f0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002', 'التحفيظ والتفسير', 'Quran & Tafsir', 12),
  ('f0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000005', 'الرياضيات', 'Mathematics', 8);

-- Students
INSERT INTO students (id, user_id, student_number, section_id, date_of_birth) VALUES
  ('g0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000004', '0471', 'd0000000-0000-0000-0000-000000000002', '2015-03-15'),
  ('g0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000006', '0472', 'd0000000-0000-0000-0000-000000000003', '2017-07-22');

-- Parents
INSERT INTO parents (id, user_id) VALUES
  ('h0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000003');

INSERT INTO parent_students (parent_id, student_id, relationship) VALUES
  ('h0000000-0000-0000-0000-000000000001', 'g0000000-0000-0000-0000-000000000001', 'father'),
  ('h0000000-0000-0000-0000-000000000001', 'g0000000-0000-0000-0000-000000000002', 'father');

-- Teacher-Section assignments
INSERT INTO teacher_sections (teacher_id, section_id, subject_id, academic_year_id) VALUES
  ('f0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001'),
  ('f0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001'),
  ('f0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001');

-- Fee schedule
INSERT INTO fee_schedules (academic_year_id, grade_id, monthly_amount) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000004', 850.00),
  ('a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', 750.00);
