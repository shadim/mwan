'use client';

import { useI18n } from '@/lib/i18n-context';
import { Star, T } from '@/components/ui';
import { getHijriYear } from '@/lib/hijri';
import Link from 'next/link';

function Section({ children, bg, style, id }: { children: React.ReactNode; bg?: string; style?: React.CSSProperties; id?: string }) {
  return (
    <section id={id} style={{ padding: '64px 24px', background: bg || 'transparent', ...style }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>{children}</div>
    </section>
  );
}

export default function HomePage() {
  const hijri = getHijriYear();
  return (
    <>
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/school-exterior-ai.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(19,74,52,0.88) 0%, rgba(27,96,69,0.92) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,10vw,96px) 24px clamp(48px,8vw,80px)', textAlign: 'center' }}>
          <div className="pub-eyebrow" style={{ justifyContent: 'center', color: 'var(--accent-warm)' }}>
            <T ar={`العام الدراسي ${hijri.arH}`} en={`Academic Year ${hijri.enH}`} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, color: '#fff', margin: '20px 0 12px', lineHeight: 1.15 }}>
            <T ar="مدرسه الانصار لافضل العلوم" en="Light of Knowledge" /><br />
            <span style={{ fontFamily: 'var(--font-arabic-quran)', fontWeight: 400, fontStyle: 'italic', color: 'var(--brass-300)' }}>
              <T ar="كهف هذا الزمان" en="And the Blessing of Education" />
            </span>
          </h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: 'rgba(255,255,255,0.8)', maxWidth: 540, margin: '0 auto', lineHeight: 1.8 }}>
            <T ar="مدرسة قرآنية تعليمية تجمع بين الأصالة والعلوم الحديثة في بيئة تربوية متميزة" en="A Quranic educational school blending authentic tradition with modern sciences in an outstanding educational environment" />
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
            <Link href="/public/register" style={{ background: 'var(--accent)', color: 'var(--on-accent)', padding: '14px 28px', borderRadius: 8, fontFamily: 'var(--font-arabic-display)', fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: '0 6px 24px rgba(45,146,105,0.35)' }}>
              <T ar="ابدأ التسجيل ←" en="Start Registration →" />
            </Link>
            {/* <Link href="/public/about" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', padding: '14px 28px', borderRadius: 8, fontFamily: 'var(--font-arabic-display)', fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
              <T ar="جولة افتراضية" en="Virtual Tour" />
            </Link> */}
          </div>
        </div>
      </div>

      {/* Programs */}
      <Section bg="var(--bg-elev)" style={{ padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="pub-eyebrow" style={{ justifyContent: 'center' }}><T ar="برامجنا" en="Our Programs" /></div>
          <h2 className="pub-title"><T ar="تعليم شامل ومتوازن" en="Comprehensive & Balanced Education" /></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {[
            { icon: '📖', ar: 'تحفيظ القرآن', en: 'Quran Memorization', subAr: 'حلقات يومية مع معلمين مختصين', subEn: 'Daily circles with specialized teachers' },
            { icon: '🕌', ar: 'العلوم الشرعية', en: 'Islamic Studies', subAr: 'عقيدة · فقه · حديث', subEn: 'Aqeedah · Fiqh · Hadith' },
            // { icon: '🔬', ar: 'العلوم الحديثة', en: 'Modern Sciences', subAr: 'رياضيات · علوم · تقنية', subEn: 'Math · Science · Technology' },
            { icon: '🤲', ar: 'التربيه الايمانيه', en: 'Faith Education', subAr: 'تعلمنا الايمان ثم تعلمنا القرآن', subEn: 'We learned faith, then we learned the Quran' },
          ].map((p, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', textAlign: 'center', transition: 'box-shadow 0.2s' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{p.icon}</div>
              <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 16, fontWeight: 600, color: 'var(--fg-1)' }}><T ar={p.ar} en={p.en} /></div>
              <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 6, lineHeight: 1.6 }}><T ar={p.subAr} en={p.subEn} /></div>
            </div>
          ))}
        </div>
      </Section>

      {/* About snippet */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'center' }}>
          <div>
            <div className="pub-eyebrow"><T ar="من نحن" en="About Us" /></div>
            <h2 className="pub-title"><T ar="مدرسه الانصار لافضل العلوم" en="A Home of Knowledge & Values" /></h2>
            <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.85, margin: '0 0 20px' }}>
              <T ar="تأسست مدرسة المهاجرين والأنصار عام ١٤٤٥ هـ بهدف تقديم تعليم متميز يجمع بين حفظ القرآن الكريم والعلوم الشرعية والتربيه الايمانيه، في بيئة تربوية آمنة ومحفزة." en="Almohajirin wel Ansar Madrasa was established in 1426H with the goal of providing distinguished education combining Quran memorization, Islamic studies, and modern curricula in a safe and stimulating educational environment." />
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { n: '+٤٥', nEn: '480+', l: 'طالب وطالبة', lEn: 'Students' },
                { n: '+٥', nEn: '32+', l: 'معلم ومعلمة', lEn: 'Teachers' },
                { n: '+٢', nEn: '18+', l: 'عاماً من العطاء', lEn: 'Years of giving' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 28, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}><T ar={s.n} en={s.nEn} /></div>
                  <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4, fontFamily: 'var(--font-arabic-display)' }}><T ar={s.l} en={s.lEn} /></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
            <img src="/images/school-exterior-ai.jpeg" alt="School" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </div>
        </div>
      </Section>

      {/* Campaign */}
      <Section bg="var(--bg-elev)">
        <div style={{ background: 'linear-gradient(135deg, var(--green-800), var(--green-900))', borderRadius: 16, padding: 'clamp(28px, 5vw, 48px)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 11, color: 'var(--brass-300)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
                <T ar="حملة مستمرة" en="Ongoing Campaign" />
              </div>
              <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, lineHeight: 1.2 }}>
                <T ar="ساهم في مشروع القرآن الكريم" en="Contribute to the Quran Project" />
              </div>
              <p style={{ fontSize: 14, opacity: 0.8, marginTop: 10, lineHeight: 1.8 }}>
                <T ar="ساهم في مشروع التحفيظ والتلاوة، لتكون صدقة جارية لك ولأهلك" en="Contribute to building a dedicated hall for memorization and recitation circles — an ongoing charity for you and your family" />
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8, color: 'rgba(255,255,255,0.7)' }}>
                <span><span style={{ color: 'var(--brass-300)', fontSize: 18, fontWeight: 700 }}>٣٢٪</span> <T ar="من الهدف" en="of goal" /></span>
                <span>٦٤٬٠٠٠ / ٢٠٠٬٠٠٠ ₪</span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '32%', background: 'var(--brass-300)', borderRadius: 999 }} />
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <Link href="/public/contact" style={{ background: 'var(--brass-300)', color: 'var(--green-900)', padding: '12px 24px', borderRadius: 8, fontFamily: 'var(--font-arabic-display)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                  <T ar="ساهم الآن" en="Donate Now" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section style={{ padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, textAlign: 'center' }}>
          {[
            { n: '٩٦٪', nEn: '96%', l: 'نسبة الحضور', lEn: 'Attendance Rate' },
            { n: '١٢', nEn: '12', l: 'حافظاً هذا العام', lEn: 'Huffaz This Year' },
            { n: '٩٨٪', nEn: '98%', l: 'رضا أولياء الأمور', lEn: 'Parent Satisfaction' },
            { n: '٣', nEn: '3', l: 'لغات تدريس', lEn: 'Teaching Languages' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '20px 12px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12 }}>
              <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 32, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}><T ar={s.n} en={s.nEn} /></div>
              <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 6, fontFamily: 'var(--font-arabic-display)' }}><T ar={s.l} en={s.lEn} /></div>
            </div>
          ))}
        </div>
      </Section>

      {/* Verse */}
      <Section bg="var(--bg-elev)" style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ flex: '0 1 80px', height: 1, background: 'var(--divider)' }} />
          <Star size={14} color="var(--accent-warm)" />
          <div style={{ flex: '0 1 80px', height: 1, background: 'var(--divider)' }} />
        </div>
        <div style={{ fontFamily: 'var(--font-arabic-quran)', fontSize: 'clamp(20px, 4vw, 30px)', color: 'var(--fg-1)', lineHeight: 2 }}>
          ﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾
        </div>
        <div style={{ fontSize: 12, color: 'var(--accent-warm)', marginTop: 8, letterSpacing: '0.15em', fontFamily: 'var(--font-arabic-display)' }}>
          طه · ١١٤
        </div>
      </Section>

      {/* CTA */}
      <Section style={{ textAlign: 'center', padding: '64px 24px' }}>
        <h2 className="pub-title"><T ar="انضم إلى عائلتنا" en="Join Our Family" /></h2>
        <p style={{ fontSize: 16, color: 'var(--fg-3)', maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.8 }}>
          <T ar={`باب التسجيل مفتوح للعام الدراسي ${hijri.arH}. سارع بتسجيل أبنائك الآن.`} en={`Registration is open for the academic year ${hijri.enH}. Register your children now.`} />
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/public/register" style={{ background: 'var(--accent)', color: 'var(--on-accent)', padding: '14px 32px', borderRadius: 8, fontFamily: 'var(--font-arabic-display)', fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: 'var(--shadow-accent)' }}>
            <T ar="سجّل الآن" en="Register Now" />
          </Link>
        </div>
      </Section>
    </>
  );
}
