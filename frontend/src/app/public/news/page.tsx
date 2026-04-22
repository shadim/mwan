'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n-context';

function T({ ar, en }: { ar: string; en: string }) {
  const { t } = useI18n();
  return <>{t(ar, en)}</>;
}

const categories = [
  { id: 'all', ar: 'الكل', en: 'All' },
  { id: 'academic', ar: 'أكاديمي', en: 'Academic' },
  { id: 'events', ar: 'فعاليات', en: 'Events' },
  { id: 'quran', ar: 'قرآن', en: 'Quran' },
  { id: 'community', ar: 'مجتمع', en: 'Community' },
];

const news = [
  { cat: 'quran', dAr: '١٨ رمضان ١٤٤٧', dEn: 'Ramadan 18', tAr: 'تخريج ١٢ حافظاً للقرآن الكريم', tEn: '12 Quran Huffaz Graduate', descAr: 'أقامت المدرسة حفل تخريج الدفعة السابعة من حفاظ القرآن الكريم.', descEn: 'The school held the graduation ceremony for the seventh class of Quran memorizers.', featured: true },
  { cat: 'events', dAr: '١٥ رمضان ١٤٤٧', dEn: 'Ramadan 15', tAr: 'إفطار جماعي لأولياء الأمور', tEn: 'Community Iftar for Parents', descAr: 'نظمت المدرسة إفطاراً جماعياً ضم أكثر من ٢٠٠ شخص.', descEn: 'The school organized a community iftar gathering over 200 people.' },
  { cat: 'academic', dAr: '١٠ رمضان ١٤٤٧', dEn: 'Ramadan 10', tAr: 'نتائج امتحانات الفصل الثاني', tEn: 'Second Semester Exam Results', descAr: 'أعلنت المدرسة عن نتائج امتحانات الفصل الثاني بنسبة نجاح ٩٧٪.', descEn: 'The school announced results with a 97% pass rate.' },
  { cat: 'community', dAr: '٥ رمضان ١٤٤٧', dEn: 'Ramadan 5', tAr: 'حملة بناء قاعة القرآن تتجاوز ٦٠٪', tEn: 'Quran Hall Campaign Exceeds 60%', descAr: 'تجاوزت حملة التبرعات لبناء قاعة القرآن نسبة ٦٠٪ من الهدف.', descEn: 'The Quran Hall donation campaign has exceeded 60% of its goal.' },
  { cat: 'events', dAr: '٢٨ شعبان ١٤٤٧', dEn: 'Sha\'ban 28', tAr: 'يوم رياضي مفتوح', tEn: 'Open Sports Day', descAr: 'أقامت المدرسة يوماً رياضياً مفتوحاً شارك فيه الطلاب وأولياء الأمور.', descEn: 'The school held an open sports day with students and parents.' },
  { cat: 'academic', dAr: '٢٠ شعبان ١٤٤٧', dEn: 'Sha\'ban 20', tAr: 'ورشة تدريبية للمعلمين', tEn: 'Teacher Training Workshop', descAr: 'عقدت المدرسة ورشة تدريبية حول أساليب التعليم التفاعلي.', descEn: 'The school held a training workshop on interactive teaching methods.' },
];

export default function NewsPage() {
  const [filter, setFilter] = useState('all');
  const { t } = useI18n();
  const filtered = filter === 'all' ? news : news.filter(n => n.cat === filter);

  return (
    <>
      <div style={{ background: 'var(--green-800)', color: '#fff', padding: 'clamp(48px,8vw,80px) 24px', textAlign: 'center' }}>
        <div className="pub-eyebrow" style={{ justifyContent: 'center', color: 'var(--accent-warm)' }}><T ar="آخر المستجدات" en="Latest Updates" /></div>
        <h1 style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, margin: '16px 0 0' }}>
          <T ar="الأخبار والفعاليات" en="News & Events" />
        </h1>
      </div>

      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button key={c.id} onClick={() => setFilter(c.id)} style={{
                padding: '8px 18px', borderRadius: 999, fontFamily: 'var(--font-arabic-display)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
                background: filter === c.id ? 'var(--accent)' : 'var(--bg-card)',
                color: filter === c.id ? 'var(--on-accent)' : 'var(--fg-2)',
                boxShadow: filter === c.id ? 'var(--shadow-accent)' : 'var(--shadow-sm)',
              }}>{t(c.ar, c.en)}</button>
            ))}
          </div>

          {filter === 'all' && (
            <div style={{ background: 'linear-gradient(135deg, var(--green-700), var(--green-800))', borderRadius: 16, padding: 'clamp(24px,4vw,40px)', color: '#fff', marginBottom: 24 }}>
              <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 999, background: 'var(--brass-300)', color: 'var(--green-900)', fontSize: 11, fontFamily: 'var(--font-arabic-display)', fontWeight: 600, marginBottom: 12 }}><T ar="خبر مميز" en="Featured" /></span>
              <h2 style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 700, margin: '0 0 8px' }}><T ar={news[0].tAr} en={news[0].tEn} /></h2>
              <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.8, margin: 0, maxWidth: 600 }}><T ar={news[0].descAr} en={news[0].descEn} /></p>
              <div style={{ fontSize: 12, color: 'var(--brass-300)', marginTop: 12, fontFamily: 'var(--font-arabic-display)' }}><T ar={news[0].dAr} en={news[0].dEn} /></div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {(filter === 'all' ? filtered.slice(1) : filtered).map((n, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 22, cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 10.5, fontFamily: 'var(--font-arabic-display)', fontWeight: 500, background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}>
                    {t(categories.find(c => c.id === n.cat)?.ar || '', categories.find(c => c.id === n.cat)?.en || '')}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--fg-3)', fontFamily: 'var(--font-arabic-display)' }}><T ar={n.dAr} en={n.dEn} /></span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 16, fontWeight: 600, color: 'var(--fg-1)', margin: '0 0 8px', lineHeight: 1.4 }}><T ar={n.tAr} en={n.tEn} /></h3>
                <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7, margin: 0 }}><T ar={n.descAr} en={n.descEn} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
