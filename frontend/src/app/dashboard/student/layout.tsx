'use client';

import { AppShell } from '@/components/app-shell';

const tabs = [
  { icon: '🏠', ar: 'الرئيسية', en: 'Home', path: '/dashboard/student' },
  { icon: '📖', ar: 'الحفظ', en: 'Hifz', path: '/dashboard/student/hifz' },
  { icon: '📅', ar: 'الجدول', en: 'Schedule', path: '/dashboard/student/schedule' },
  { icon: '📝', ar: 'الواجبات', en: 'Homework', path: '/dashboard/student/homework' },
  { icon: '🏆', ar: 'الإنجاز', en: 'Achievements', path: '/dashboard/student/achievements' },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell tabs={tabs} role="واجهة الطالب" roleEn="Student Portal">
      {children}
    </AppShell>
  );
}
