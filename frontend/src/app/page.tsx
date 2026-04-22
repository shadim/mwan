'use client';

import { useAuth } from '@/lib/auth-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Root page — redirect based on role
export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    // Redirect to role-specific dashboard
    const routes: Record<string, string> = {
      manager: '/dashboard/manager',
      teacher: '/dashboard/teacher',
      student: '/dashboard/student',
      parent: '/dashboard/parent',
    };
    router.replace(routes[user.role] || '/login');
  }, [user, loading, router]);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-arabic-display)',
    }}>
      <div style={{ textAlign: 'center', color: 'var(--fg-3)' }}>
        جاري التحميل...
      </div>
    </div>
  );
}
