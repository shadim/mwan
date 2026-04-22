// Home page sections — hero, programs, about snippet, campaign, stats, verse, CTA

function HeroSection() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(img/school-front.jpeg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(19,74,52,0.88) 0%, rgba(27,96,69,0.92) 100%)' }}/>
      {/* Girih pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.06,
        backgroundImage: 'url(img/pattern-girih.svg)', backgroundSize: '160px',
      }}/>
      <div style={{
        position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(48px,10vw,96px) 24px clamp(48px,8vw,80px)',
        textAlign: 'center',
      }}>
        <SectionEyebrow><T ar="العام الدراسي ١٤٤٧ هـ" en="Academic Year 1447H"/></SectionEyebrow>
        <h1 style={{
          fontFamily: 'Reem Kufi, sans-serif', fontSize: 'clamp(32px, 6vw, 56px)',
          fontWeight: 700, color: '#fff', margin: '20px 0 12px', lineHeight: 1.15,
        }}>
          <T ar="نور العلم" en="Light of Knowledge"/>
          <br/>
          <span style={{ fontFamily: 'Amiri, serif', fontWeight: 400, fontStyle: 'italic', color: 'var(--brass-300)' }}>
            <T ar="وبركة التربية" en="And the Blessing of Education"/>
          </span>
        </h1>
        <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: 'rgba(255,255,255,0.8)', maxWidth: 540, margin: '0 auto', lineHeight: 1.8 }}>
          <T ar="مدرسة قرآنية تعليمية تجمع بين الأصالة والعلوم الحديثة في بيئة تربوية متميزة"
             en="A Quranic educational school blending authentic tradition with modern sciences in an outstanding educational environment"/>
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
          <a href="contact.html" style={{
            background: 'var(--accent)', color: 'var(--on-accent)',
            padding: '14px 28px', borderRadius: 8, fontFamily: 'Reem Kufi',
            fontSize: 15, fontWeight: 600, textDecoration: 'none',
            boxShadow: '0 6px 24px rgba(45,146,105,0.35)',
          }}>
            <T ar="ابدأ التسجيل ←" en="Start Registration →"/>
          </a>
          <a href="about.html" style={{
            background: 'rgba(255,255,255,0.12)', color: '#fff',
            padding: '14px 28px', borderRadius: 8, fontFamily: 'Reem Kufi',
            fontSize: 15, fontWeight: 600, textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <T ar="جولة افتراضية" en="Virtual Tour"/>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProgramsStrip() {
  const programs = [
    { icon: '📖', ar: 'تحفيظ القرآن', en: 'Quran Memorization', subAr: 'حلقات يومية مع معلمين مختصين', subEn: 'Daily circles with specialized teachers' },
    { icon: '🕌', ar: 'العلوم الشرعية', en: 'Islamic Studies', subAr: 'عقيدة · فقه · حديث · سيرة', subEn: 'Aqeedah · Fiqh · Hadith · Seerah' },
    { icon: '🔬', ar: 'العلوم الحديثة', en: 'Modern Sciences', subAr: 'رياضيات · علوم · تقنية', subEn: 'Math · Science · Technology' },
    { icon: '🌍', ar: 'اللغات', en: 'Languages', subAr: 'عربية · عبرية · إنجليزية', subEn: 'Arabic · Hebrew · English' },
  ];
  return (
    <Section bg="var(--bg-elev)" style={{ padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <SectionEyebrow><T ar="برامجنا" en="Our Programs"/></SectionEyebrow>
        <SectionTitle sub={null}><T ar="تعليم شامل ومتوازن" en="Comprehensive & Balanced Education"/></SectionTitle>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {programs.map((p, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 20px', textAlign: 'center',
            transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'pointer',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{p.icon}</div>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 16, fontWeight: 600, color: 'var(--fg-1)' }}>
              <T ar={p.ar} en={p.en}/>
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 6, lineHeight: 1.6 }}>
              <T ar={p.subAr} en={p.subEn}/>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AboutSnippet() {
  return (
    <Section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'center' }}>
        <div>
          <SectionEyebrow><T ar="من نحن" en="About Us"/></SectionEyebrow>
          <SectionTitle><T ar="بيت العلم والتربية" en="A Home of Knowledge & Values"/></SectionTitle>
          <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.85, margin: '0 0 20px' }}>
            <T ar="تأسست مدرسة المهاجرين والأنصار عام ١٤٢٦ هـ بهدف تقديم تعليم متميز يجمع بين حفظ القرآن الكريم والعلوم الشرعية والمناهج الحديثة، في بيئة تربوية آمنة ومحفزة."
               en="Almohajirin wel Ansar Madrasa was established in 1426H with the goal of providing distinguished education combining Quran memorization, Islamic studies, and modern curricula in a safe and stimulating educational environment."/>
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { n: '+٤٨٠', nEn: '480+', l: 'طالب وطالبة', lEn: 'Students' },
              { n: '+٣٢', nEn: '32+', l: 'معلم ومعلمة', lEn: 'Teachers' },
              { n: '+١٨', nEn: '18+', l: 'عاماً من العطاء', lEn: 'Years of giving' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Reem Kufi', fontSize: 28, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                  <T ar={s.n} en={s.nEn}/>
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4, fontFamily: 'Reem Kufi' }}>
                  <T ar={s.l} en={s.lEn}/>
                </div>
              </div>
            ))}
          </div>
          <a href="about.html" style={{
            display: 'inline-block', marginTop: 24, fontFamily: 'Reem Kufi', fontSize: 14,
            fontWeight: 600, color: 'var(--accent)', textDecoration: 'none',
          }}>
            <T ar="اقرأ المزيد ←" en="Read More →"/>
          </a>
        </div>
        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          <img src="img/school-exterior.jpeg" alt="School" style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/>
        </div>
      </div>
    </Section>
  );
}

function CampaignSection() {
  return (
    <Section bg="var(--bg-elev)">
      <div style={{
        background: 'linear-gradient(135deg, var(--green-800), var(--green-900))',
        borderRadius: 16, padding: 'clamp(28px, 5vw, 48px)', color: '#fff',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'url(img/pattern-girih.svg)', backgroundSize: '120px' }}/>
        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 11, color: 'var(--brass-300)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
              <T ar="حملة مستمرة" en="Ongoing Campaign"/>
            </div>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, lineHeight: 1.2 }}>
              <T ar="بناء قاعة القرآن الكريم" en="Building the Quran Hall"/>
            </div>
            <p style={{ fontSize: 14, opacity: 0.8, marginTop: 10, lineHeight: 1.8 }}>
              <T ar="ساهم في بناء قاعة مخصصة لحلقات التحفيظ والتلاوة، لتكون صدقة جارية لك ولأهلك"
                 en="Contribute to building a dedicated hall for memorization and recitation circles — an ongoing charity for you and your family"/>
            </p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8, color: 'rgba(255,255,255,0.7)' }}>
              <span><span style={{ color: 'var(--brass-300)', fontSize: 18, fontWeight: 700 }}>٦٨٪</span> <T ar="من الهدف" en="of goal"/></span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>١٣٦٬٠٠٠ / ٢٠٠٬٠٠٠ ₪</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '68%', background: 'var(--brass-300)', borderRadius: 999 }}/>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <a href="contact.html" style={{
                background: 'var(--brass-300)', color: 'var(--green-900)',
                padding: '12px 24px', borderRadius: 8, fontFamily: 'Reem Kufi',
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
              }}>
                <T ar="ساهم الآن" en="Donate Now"/>
              </a>
              <a href="#" style={{
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                padding: '12px 24px', borderRadius: 8, fontFamily: 'Reem Kufi',
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <T ar="تفاصيل" en="Details"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function StatsStrip() {
  const stats = [
    { n: '٩٦٪', nEn: '96%', l: 'نسبة الحضور', lEn: 'Attendance Rate' },
    { n: '١٢', nEn: '12', l: 'حافظاً هذا العام', lEn: 'Huffaz This Year' },
    { n: '٩٨٪', nEn: '98%', l: 'رضا أولياء الأمور', lEn: 'Parent Satisfaction' },
    { n: '٣', nEn: '3', l: 'لغات تدريس', lEn: 'Teaching Languages' },
  ];
  return (
    <Section style={{ padding: '40px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, textAlign: 'center' }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: '20px 12px', background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 12,
          }}>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 32, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
              <T ar={s.n} en={s.nEn}/>
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 6, fontFamily: 'Reem Kufi' }}>
              <T ar={s.l} en={s.lEn}/>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function VerseSection() {
  return (
    <Section bg="var(--bg-elev)" style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
        <div style={{ flex: '0 1 80px', height: 1, background: 'var(--divider)' }}/>
        <Star8 size={14} color="var(--accent-warm)"/>
        <div style={{ flex: '0 1 80px', height: 1, background: 'var(--divider)' }}/>
      </div>
      <div style={{ fontFamily: 'Amiri, serif', fontSize: 'clamp(20px, 4vw, 30px)', color: 'var(--fg-1)', lineHeight: 2 }}>
        ﴾ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴿
      </div>
      <div style={{ fontSize: 12, color: 'var(--accent-warm)', marginTop: 8, letterSpacing: '0.15em', fontFamily: 'Reem Kufi' }}>
        طه · ١١٤
      </div>
    </Section>
  );
}

function CTASection() {
  return (
    <Section style={{ textAlign: 'center', padding: '64px 24px' }}>
      <SectionTitle>
        <T ar="انضم إلى عائلتنا" en="Join Our Family"/>
      </SectionTitle>
      <p style={{ fontSize: 16, color: 'var(--fg-3)', maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.8 }}>
        <T ar="باب التسجيل مفتوح للعام الدراسي ١٤٤٧ هـ. سارع بتسجيل أبنائك الآن."
           en="Registration is open for the academic year 1447H. Register your children now."/>
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="contact.html" style={{
          background: 'var(--accent)', color: 'var(--on-accent)',
          padding: '14px 32px', borderRadius: 8, fontFamily: 'Reem Kufi',
          fontSize: 15, fontWeight: 600, textDecoration: 'none',
          boxShadow: 'var(--shadow-accent)',
        }}>
          <T ar="سجّل الآن" en="Register Now"/>
        </a>
        <a href="contact.html" style={{
          padding: '14px 32px', borderRadius: 8, fontFamily: 'Reem Kufi',
          fontSize: 15, fontWeight: 600, textDecoration: 'none',
          color: 'var(--fg-1)', border: '1px solid var(--border)',
        }}>
          <T ar="تواصل معنا" en="Contact Us"/>
        </a>
      </div>
    </Section>
  );
}

Object.assign(window, { HeroSection, ProgramsStrip, AboutSnippet, CampaignSection, StatsStrip, VerseSection, CTASection });
