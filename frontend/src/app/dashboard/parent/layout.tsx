'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AppShell } from '@/components/app-shell';

const tabs = [
  { icon: '🏠', ar: 'الرئيسية', en: 'Home', path: '/dashboard/parent' },
  { icon: '📊', ar: 'التقدم', en: 'Progress', path: '/dashboard/parent/progress' },
  { icon: '💬', ar: 'الرسائل', en: 'Messages', path: '/dashboard/parent/messages' },
  { icon: '💳', ar: 'الرسوم', en: 'Fees', path: '/dashboard/parent/fees' },
  { icon: '📅', ar: 'التقويم', en: 'Calendar', path: '/dashboard/parent/calendar' },
];

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'parent')) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'parent') return null;

  return (
    <AppShell tabs={tabs} role="واجهة ولي الأمر" roleEn="Parent Portal">
      {children}
    </AppShell>
  );
}
