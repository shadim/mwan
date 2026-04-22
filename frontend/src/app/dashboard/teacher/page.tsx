'use client';

import { useI18n } from '@/lib/i18n-context';

// Placeholder — implement full attendance tab from design prototype
export default function TeacherAttendance() {
  const { t } = useI18n();
  return (
    <div>
      <h2 style={{ margin: 0, fontFamily: 'var(--font-arabic-display)', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        {t('تسجيل الحضور', 'Record Attendance')}
      </h2>
      <p style={{ color: 'var(--fg-3)', marginTop: 8 }}>
        {t('ارجع إلى design-archive/apps/teacher.html لتنفيذ واجهة الحضور التفاعلية', 'Refer to design-archive/apps/teacher.html for the interactive attendance UI implementation')}
      </p>
    </div>
  );
}
