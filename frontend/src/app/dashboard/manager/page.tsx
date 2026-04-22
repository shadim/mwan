'use client';

import { useI18n } from '@/lib/i18n-context';
import { Card, Chip, Btn, Stat, Eyebrow } from '@/components/ui';

export default function ManagerDashboard() {
  const { t } = useI18n();

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-arabic-display)', fontSize: 22, fontWeight: 700, color: 'var(--fg-1)' }}>
            {t('مرحباً، الأستاذ محمد', 'Welcome, Mr. Mohammed')}
          </h2>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>
            {t('٢٢ رمضان ١٤٤٧ هـ · الثلاثاء', 'Ramadan 22, 1447H · Tuesday')}
          </div>
        </div>
        <Btn size="sm" variant="ghost">{t('تصدير تقرير', 'Export Report')}</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 16 }}>
        <Stat label={t('الطلاب', 'Students')} value="٤٨٠" delta="+١٢" positive />
        <Stat label={t('الحضور', 'Attendance')} value="٩٦٪" delta="+٢" positive />
        <Stat label={t('المعلمين', 'Teachers')} value="٣٢" />
        <Stat label={t('حملة البناء', 'Campaign')} value="٦٨٪" delta="+٥" positive />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12 }}>
        {/* Attendance chart */}
        <Card>
          <Eyebrow>{t('الحضور الأسبوعي', 'Weekly Attendance')}</Eyebrow>
          <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 15, fontWeight: 600, color: 'var(--fg-1)', marginTop: 4, marginBottom: 12 }}>
            {t('آخر ٧ أيام', 'Last 7 Days')}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
            {[86,92,88,96,94,90,96].map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', height: `${v}%`, background: i === 6 ? 'var(--accent)' : 'var(--green-200)', borderRadius: '4px 4px 0 0' }} />
                <span style={{ fontSize: 9, color: 'var(--fg-3)' }}>{v}٪</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Tasks */}
        <Card>
          <Eyebrow>{t('مهام اليوم', 'Today\'s Tasks')}</Eyebrow>
          <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 15, fontWeight: 600, color: 'var(--fg-1)', marginTop: 4, marginBottom: 12 }}>
            {t('٤ مفتوحة', '4 Open')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { t: t('مراجعة ميزانية شعبان', 'Review Sha\'ban budget'), tag: t('عاجل', 'Urgent'), tone: 'danger' as const },
              { t: t('اجتماع أولياء الأمور', 'Parents meeting'), tag: t('اليوم', 'Today'), tone: 'warm' as const },
              { t: t('توظيف معلم جديد', 'Hire new teacher'), tag: t('قيد المراجعة', 'In Review'), tone: 'default' as const },
            ].map((task, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, border: '2px solid var(--border)', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--fg-1)', flex: 1 }}>{task.t}</span>
                <Chip tone={task.tone}>{task.tag}</Chip>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent donations */}
      <Card style={{ marginTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <Eyebrow>{t('التبرعات الأخيرة', 'Recent Donations')}</Eyebrow>
            <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 15, fontWeight: 600, color: 'var(--fg-1)', marginTop: 4 }}>
              {t('هذا الأسبوع', 'This Week')}
            </div>
          </div>
          <Chip tone="success">+٢٣</Chip>
        </div>
        {[
          { name: t('أحمد الحسيني', 'Ahmad Al-Husseini'), purpose: t('زكاة', 'Zakat'), amt: '٢٬٥٠٠', time: t('قبل ساعة', '1h ago') },
          { name: t('فاطمة الزهراء', 'Fatima Al-Zahraa'), purpose: t('حملة البناء', 'Building Campaign'), amt: '١٬٠٠٠', time: t('قبل ٣ س', '3h ago') },
          { name: t('خالد عبدالله', 'Khalid Abdullah'), purpose: t('كفالة طالب', 'Student Sponsorship'), amt: '٦٠٠', time: t('أمس', 'Yesterday') },
        ].map((d, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 0', borderTop: i ? '1px solid var(--divider)' : 'none',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 999, background: 'var(--bg-card-hover)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontFamily: 'var(--font-arabic-display)', color: 'var(--accent)',
            }}>{d.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: 'var(--fg-1)', fontFamily: 'var(--font-arabic-display)', fontWeight: 500 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>{d.purpose} · {d.time}</div>
            </div>
            <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>
              {d.amt} ₪
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
