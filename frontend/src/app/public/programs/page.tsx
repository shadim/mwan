'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n-context';

function T({ ar, en }: { ar: string; en: string }) {
  const { t } = useI18n();
  return <>{t(ar, en)}</>;
}

const programs = [
  { tabAr: 'تحفيظ القرآن', tabEn: 'Quran', titleAr: 'برنامج تحفيظ القرآن الكريم', titleEn: 'Holy Quran Memorization', descAr: 'برنامج شامل لحفظ القرآن الكريم كاملاً مع إتقان أحكام التجويد وفهم المعاني.', descEn: 'A comprehensive program for complete Quran memorization with mastery of Tajweed.', features: [{ ar: 'حلقات يومية صباحية ومسائية', en: 'Daily morning and evening circles' }, { ar: 'منهج متدرج من جزء عمّ إلى الختمة', en: 'Graduated curriculum' }, { ar: 'مراجعة دورية وتثبيت الحفظ', en: 'Periodic review' }, { ar: 'مسابقات قرآنية سنوية', en: 'Annual competitions' }], ageAr: 'من ٦ سنوات', ageEn: 'Ages 6+', hoursAr: '١٠ ساعات', hoursEn: '10 hours' },
  { tabAr: 'العلوم الشرعية', tabEn: 'Islamic', titleAr: 'برنامج العلوم الشرعية', titleEn: 'Islamic Studies', descAr: 'دراسة منهجية للعلوم الإسلامية تشمل العقيدة والفقه والحديث والسيرة.', descEn: 'Systematic study of Islamic sciences including Aqeedah, Fiqh, Hadith.', features: [{ ar: 'العقيدة الإسلامية الصحيحة', en: 'Correct Islamic Aqeedah' }, { ar: 'فقه العبادات والمعاملات', en: 'Fiqh of worship' }, { ar: 'دراسة الحديث النبوي', en: 'Prophetic Hadith' }, { ar: 'السيرة النبوية', en: 'Prophetic biography' }], ageAr: 'جميع المراحل', ageEn: 'All levels', hoursAr: '٨ ساعات', hoursEn: '8 hours' },
  // { tabAr: 'العلوم الحديثة', tabEn: 'Sciences', titleAr: 'برنامج العلوم الحديثة', titleEn: 'Modern Sciences', descAr: 'منهج أكاديمي متكامل يشمل الرياضيات والعلوم والتقنية.', descEn: 'An integrated academic curriculum including math, science, and technology.', features: [{ ar: 'الرياضيات — من الأساسيات إلى الجبر', en: 'Mathematics' }, { ar: 'العلوم الطبيعية', en: 'Natural sciences' }, { ar: 'مقدمة في البرمجة', en: 'Intro to programming' }, { ar: 'مختبر علوم مجهّز', en: 'Science lab' }], ageAr: 'الصف ١—٦', ageEn: 'Grades 1-6', hoursAr: '١٢ ساعة', hoursEn: '12 hours' },
  { tabAr: 'التربيه الايمانيه', tabEn: 'Languages', titleAr: 'برنامج التربيه الايمانيه', titleEn: 'Languages Program', descAr: 'تعليم ثلاث لغات أساسية مع التركيز على المهارات الأربع.', descEn: 'Teaching three core languages with focus on four skills.', features: [{ ar: 'العربية — نحو وصرف وبلاغة', en: 'Arabic grammar' }, { ar: 'الإنجليزية — محادثة وكتابة', en: 'English conversation' }, { ar: 'العبرية — تواصل عملي', en: 'Hebrew communication' }, { ar: 'أنشطة لغوية تفاعلية', en: 'Interactive activities' }], ageAr: 'جميع المراحل', ageEn: 'All levels', hoursAr: '٦ ساعات', hoursEn: '6 hours' },
];

export default function ProgramsPage() {
  const [tab, setTab] = useState(0);
  const { t } = useI18n();
  const p = programs[tab];

  return (
    <>
      <div style={{ background: 'var(--green-800)', color: '#fff', padding: 'clamp(48px,8vw,80px) 24px', textAlign: 'center' }}>
        <div className="pub-eyebrow" style={{ justifyContent: 'center', color: 'var(--accent-warm)' }}><T ar="ماذا نقدّم" en="What We Offer" /></div>
        <h1 style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, margin: '16px 0 0' }}>
          <T ar="البرامج التعليمية" en="Educational Programs" />
        </h1>
      </div>

      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 32, padding: 4, background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border)', overflowX: 'auto' }}>
            {programs.map((pr, i) => (
              <button key={i} onClick={() => setTab(i)} style={{ flex: 1, padding: '12px 8px', textAlign: 'center', fontFamily: 'var(--font-arabic-display)', fontSize: 13, fontWeight: 600, background: i === tab ? 'var(--accent)' : 'transparent', color: i === tab ? 'var(--on-accent)' : 'var(--fg-3)', border: 'none', borderRadius: 8, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {t(pr.tabAr, pr.tabEn)}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            <div>
              <div className="pub-eyebrow"><T ar={p.tabAr} en={p.tabEn} /></div>
              <h2 style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 28, fontWeight: 700, color: 'var(--fg-1)', margin: '8px 0 16px' }}><T ar={p.titleAr} en={p.titleEn} /></h2>
              <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.85 }}><T ar={p.descAr} en={p.descEn} /></p>
              <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
                {[{ l: t('الفئة العمرية', 'AGE'), v: t(p.ageAr, p.ageEn) }, { l: t('الساعات', 'HOURS'), v: t(p.hoursAr, p.hoursEn) }].map((d, i) => (
                  <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 16px' }}>
                    <div style={{ fontSize: 10, color: 'var(--accent-warm)', fontFamily: 'var(--font-arabic-display)', letterSpacing: '0.12em' }}>{d.l}</div>
                    <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)', marginTop: 2 }}>{d.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 16 }}><T ar="أبرز المميزات" en="Key Features" /></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 999, flexShrink: 0, background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>✓</div>
                    <div style={{ fontSize: 14, color: 'var(--fg-2)' }}><T ar={f.ar} en={f.en} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
