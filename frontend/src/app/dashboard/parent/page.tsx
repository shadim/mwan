'use client';

import { useI18n } from '@/lib/i18n-context';

export default function ParentHome() {
  const { t } = useI18n();
  return (
    <div>
      <h2 style={{ margin: 0, fontFamily: 'var(--font-arabic-display)', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        {t('مرحباً، خالد', 'Welcome, Khalid')}
      </h2>
      <p style={{ color: 'var(--fg-3)', marginTop: 8 }}>
        {t('ارجع إلى design-archive/apps/parent.html لتنفيذ واجهة ولي الأمر الكاملة', 'Refer to design-archive/apps/parent.html for the full parent UI implementation')}
      </p>
    </div>
  );
}
