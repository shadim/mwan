'use client';

import { useI18n } from '@/lib/i18n-context';

export default function StudentHome() {
  const { t } = useI18n();
  return (
    <div>
      <h2 style={{ margin: 0, fontFamily: 'var(--font-arabic-display)', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        {t('مرحباً، عبدالله', 'Welcome, Abdullah')} 👋
      </h2>
      <p style={{ color: 'var(--fg-3)', marginTop: 8 }}>
        {t('ارجع إلى design-archive/apps/student.html لتنفيذ واجهة الطالب الكاملة', 'Refer to design-archive/apps/student.html for the full student UI implementation')}
      </p>
    </div>
  );
}
