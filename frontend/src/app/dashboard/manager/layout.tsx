'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AppShell } from '@/components/app-shell';

const tabs = [
  { icon: '📊', ar: 'الرئيسية', en: 'Dashboard', path: '/dashboard/manager' },
  { icon: '👥', ar: 'الطلاب', en: 'Students', path: '/dashboard/manager/students' },
  { icon: '👨‍🏫', ar: 'المعلمون', en: 'Teachers', path: '/dashboard/manager/teachers' },
  { icon: '💰', ar: 'المالية', en: 'Finance', path: '/dashboard/manager/finance' },
  { icon: '📅', ar: 'التقويم', en: 'Calendar', path: '/dashboard/manager/calendar' },
  { icon: '⚙', ar: 'الإعدادات', en: 'Settings', path: '/dashboard/manager/settings' },
];

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'manager')) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'manager') return null;

  return (
    <AppShell tabs={tabs} role="لوحة المدير" roleEn="Manager Dashboard">
      {children}
    </AppShell>
  );
}
