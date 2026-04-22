'use client';

import { AppShell } from '@/components/app-shell';

const tabs = [
  { icon: '✓', ar: 'الحضور', en: 'Attendance', path: '/dashboard/teacher' },
  { icon: '📖', ar: 'الدروس', en: 'Lessons', path: '/dashboard/teacher/lessons' },
  { icon: '📝', ar: 'الواجبات', en: 'Homework', path: '/dashboard/teacher/homework' },
  { icon: '💬', ar: 'الرسائل', en: 'Messages', path: '/dashboard/teacher/messages' },
  { icon: '📅', ar: 'الجدول', en: 'Schedule', path: '/dashboard/teacher/schedule' },
  { icon: '👤', ar: 'حسابي', en: 'Profile', path: '/dashboard/teacher/profile' },
];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell tabs={tabs} role="واجهة المعلم" roleEn="Teacher Portal">
      {children}
    </AppShell>
  );
}
