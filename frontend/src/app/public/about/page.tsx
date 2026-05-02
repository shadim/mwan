'use client';

import { useI18n } from '@/lib/i18n-context';
import { Star } from '@/components/ui';

function T({ ar, en }: { ar: string; en: string }) {
  const { t } = useI18n();
  return <>{t(ar, en)}</>;
}

export default function AboutPage() {
  const values = [
    { ar: 'الإخلاص', en: 'Sincerity', dAr: 'نسعى لتحقيق رضا الله في كل عمل تعليمي وتربوي', dEn: 'We strive for God\'s pleasure in every educational effort' },
    { ar: 'الإتقان', en: 'Excellence', dAr: 'نلتزم بأعلى معايير الجودة في التعليم والإدارة', dEn: 'Committed to the highest quality standards' },
    { ar: 'الشورى', en: 'Consultation', dAr: 'نؤمن بالعمل الجماعي والتشاور في اتخاذ القرارات', dEn: 'We believe in teamwork and consultation' },
    { ar: 'الرحمة', en: 'Compassion', dAr: 'نعامل طلابنا بالرفق واللين والتفهم', dEn: 'We treat our students with kindness' },
    { ar: 'الأمانة', en: 'Trustworthiness', dAr: 'نحافظ على ثقة أولياء الأمور والمجتمع', dEn: 'We uphold the trust of parents and community' },
    { ar: 'التجديد', en: 'Innovation', dAr: 'نواكب التطور مع الحفاظ على الثوابت', dEn: 'We keep pace with progress while preserving fundamentals' },
  ];

  const timeline = [
    { y: '١٤٤٥', yEn: '2005', ar: 'تأسيس المدرسة بـ ٣٥ طالباً', en: 'School founded with 35 students' },
    { y: '١٤٣٠', yEn: '2009', ar: 'افتتاح مبنى جديد وقسم البنات', en: 'New building and girls section opened' },
    { y: '١٤٣٥', yEn: '2014', ar: 'اعتماد رسمي من وزارة التربية', en: 'Official accreditation' },
    { y: '١٤٤٠', yEn: '2019', ar: 'إطلاق برنامج العلوم الحديثة المتكامل', en: 'Launch of integrated modern sciences' },
    { y: '١٤٤٥', yEn: '2024', ar: 'تجاوز ٤٥ طالباً و٣٢ معلماً', en: 'Surpassed 480 students and 32 teachers' },
    { y: '١٤٤٧', yEn: '2026', ar: 'بناء قاعة القرآن الكريم', en: 'Building the Quran Hall' },
  ];

  return (
    <>
      <div style={{ background: 'var(--green-800)', color: '#fff', padding: 'clamp(48px,8vw,80px) 24px', textAlign: 'center' }}>
        <div className="pub-eyebrow" style={{ justifyContent: 'center', color: 'var(--accent-warm)' }}><T ar="تعرّف علينا" en="Get to Know Us" /></div>
        <h1 style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, margin: '16px 0 0' }}>
          <T ar="رسالتنا ورؤيتنا" en="Our Mission & Vision" />
        </h1>
      </div>

      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {[
            { tAr: 'رسالتنا', tEn: 'Our Mission', ar: 'تقديم تعليم قرآني وأكاديمي متميز يبني جيلاً واعياً متمسكاً بدينه ومنفتحاً على العلوم الحديثة، في بيئة تربوية آمنة تراعي الفروق الفردية وتنمي المهارات الحياتية.', en: 'To provide distinguished Quranic and academic education that builds a conscious generation committed to their faith and open to modern sciences.' },
            { tAr: 'رؤيتنا', tEn: 'Our Vision', ar: 'أن نكون المؤسسة التعليمية الرائدة في الجمع بين التعليم الشرعي والأكاديمي، ونموذجاً يُحتذى في التربية الإسلامية المعاصرة.', en: 'To be the leading educational institution in combining Islamic and academic education, and a model for contemporary Islamic education.' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28 }}>
              <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 11, color: 'var(--accent-warm)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}><T ar={item.tAr} en={item.tEn} /></div>
              <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.85, margin: 0 }}><T ar={item.ar} en={item.en} /></p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 24px 64px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          <img src="/images/school-front.jpeg" alt="School" style={{ width: '100%', height: 'auto' }} />
        </div>
      </section>

      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="pub-eyebrow" style={{ justifyContent: 'center' }}><T ar="قيمنا" en="Our Values" /></div>
            <h2 className="pub-title"><T ar="المبادئ التي نسير عليها" en="The Principles We Live By" /></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {values.map((v, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 18px', textAlign: 'center' }}>
                <Star size={20} color="var(--accent)" />
                <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 16, fontWeight: 600, color: 'var(--fg-1)', marginTop: 10 }}><T ar={v.ar} en={v.en} /></div>
                <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 6, lineHeight: 1.6 }}><T ar={v.dAr} en={v.dEn} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 24px', background: 'var(--bg-elev)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="pub-eyebrow" style={{ justifyContent: 'center' }}><T ar="مسيرتنا" en="Our Journey" /></div>
            <h2 className="pub-title"><T ar="محطات في تاريخ المدرسة" en="Milestones in Our History" /></h2>
          </div>
          <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: '50%', width: 2, background: 'var(--border)', transform: 'translateX(1px)' }} />
            {timeline.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}>
                <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'left' : 'right' }}>
                  <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.6 }}><T ar={t.ar} en={t.en} /></div>
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 999, flexShrink: 0, background: 'var(--accent)', color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-arabic-display)', fontSize: 11, fontWeight: 700, boxShadow: 'var(--shadow-accent)', zIndex: 1 }}>
                  <T ar={t.y} en={t.yEn} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
