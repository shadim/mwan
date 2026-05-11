'use client';

import { T } from '@/components/ui';

const MONTHLY_AMOUNTS = [
  { ar: '١٠٠ ₪', en: '100 ₪', href: 'https://tinyurl.com/3ezcfnu3' },
  { ar: '٢٠٠ ₪', en: '200 ₪', href: 'https://tinyurl.com/4c8usdsj' },
  { ar: '٣٠٠ ₪', en: '300 ₪', href: 'https://tinyurl.com/5anfdusz' },
  { ar: '٤٠٠ ₪', en: '400 ₪', href: 'https://tinyurl.com/yw782tcx' },
  { ar: '٥٠٠ ₪', en: '500 ₪', href: 'https://tinyurl.com/5n8td7dn' },
];

const ONE_TIME_LINK = 'https://tinyurl.com/4ep9bdkb';

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--green-800), var(--green-900))', color: '#fff', padding: 'clamp(48px,8vw,80px) 24px', textAlign: 'center' }}>
        <div className="pub-eyebrow" style={{ justifyContent: 'center', color: 'var(--accent-warm)' }}>
          <T ar="ساهم معنا" en="Support Us" />
        </div>
        <h1 style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, margin: '16px 0 12px' }}>
          <T ar="تبرّع لدعم مسيرة التعليم" en="Donate to Support Education" />
        </h1>
        <p style={{ fontSize: 'clamp(14px,2vw,17px)', color: 'rgba(255,255,255,0.8)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
          <T
            ar="تبرّعك يساهم في بناء جيل متعلّم ومتمسك بكتاب الله. كل مبلغ يُحدث فرقاً."
            en="Your donation helps build a generation grounded in the Book of Allah. Every amount makes a difference."
          />
        </p>
      </div>

      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>

          {/* Monthly standing order */}
          <div>
            <div className="pub-eyebrow"><T ar="أمر ثابت — تبرع شهري" en="Standing Order — Monthly Donation" /></div>
            <h2 className="pub-title"><T ar="تبرّع شهري عبر بطاقة الائتمان" en="Monthly Donation via Credit Card" /></h2>
            <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.8, margin: '0 0 24px' }}>
              <T
                ar="اختر المبلغ الشهري الذي يناسبك — سيتم خصمه تلقائياً كل شهر عبر بطاقة الائتمان:"
                en="Choose the monthly amount that suits you — it will be charged automatically every month via credit card:"
              />
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
              {MONTHLY_AMOUNTS.map((a, i) => (
                <a
                  key={i}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '18px 16px', borderRadius: 12,
                    background: 'var(--bg-card)', border: '2px solid var(--border)',
                    fontFamily: 'var(--font-arabic-display)', fontSize: 20, fontWeight: 700,
                    color: 'var(--accent)', textDecoration: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <T ar={a.ar} en={a.en} />
                </a>
              ))}
            </div>
          </div>

          {/* One-time donation */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 'clamp(24px,4vw,40px)', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>💝</div>
            <div className="pub-eyebrow" style={{ justifyContent: 'center' }}><T ar="تبرع لمرة واحدة" en="One-Time Donation" /></div>
            <h3 style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 700, color: 'var(--fg-1)', margin: '8px 0 12px' }}>
              <T ar="تبرّع بأي مبلغ تريده" en="Donate Any Amount You Choose" />
            </h3>
            <p style={{ fontSize: 14, color: 'var(--fg-3)', maxWidth: 480, margin: '0 auto 24px', lineHeight: 1.8 }}>
              <T
                ar="دفعة واحدة عبر بطاقة الائتمان بالمبلغ الذي تختاره"
                en="A single payment via credit card for any amount you choose"
              />
            </p>
            <a
              href={ONE_TIME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', padding: '14px 40px', borderRadius: 8,
                background: 'var(--accent)', color: 'var(--on-accent)',
                fontFamily: 'var(--font-arabic-display)', fontSize: 16, fontWeight: 600,
                textDecoration: 'none', boxShadow: 'var(--shadow-accent)',
              }}
            >
              <T ar="تبرّع الآن" en="Donate Now" />
            </a>
          </div>

          {/* Bank transfer details */}
          <div>
            <div className="pub-eyebrow"><T ar="تحويل بنكي" en="Bank Transfer" /></div>
            <h2 className="pub-title"><T ar="تفاصيل الحساب البنكي" en="Bank Account Details" /></h2>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 'clamp(20px,4vw,32px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '🏦', labelAr: 'اسم البنك', labelEn: 'Bank Name', valueAr: 'بنك لئومي (10)', valueEn: 'Bank Leumi (10)' },
                { icon: '📍', labelAr: 'الفرع', labelEn: 'Branch', valueAr: '841', valueEn: '841' },
                { icon: '🔢', labelAr: 'رقم الحساب', labelEn: 'Account Number', valueAr: '3504385', valueEn: '3504385' },
                { icon: '🏫', labelAr: 'اسم المؤسسة', labelEn: 'Institution Name', valueAr: 'المهاجرين والأنصار', valueEn: 'Almohajirin wel Ansar' },
                { icon: '📋', labelAr: 'رقم الجمعية', labelEn: 'Association Number', valueAr: '580832418', valueEn: '580832418' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 16px', background: 'color-mix(in srgb, var(--accent) 4%, transparent)', borderRadius: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: 'color-mix(in srgb, var(--accent) 12%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)', fontFamily: 'var(--font-arabic-display)' }}>
                      <T ar={item.labelAr} en={item.labelEn} />
                    </div>
                    <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 16, fontWeight: 700, color: 'var(--fg-1)' }}>
                      <T ar={item.valueAr} en={item.valueEn} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verse / motivation */}
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontFamily: 'var(--font-arabic-quran)', fontSize: 'clamp(18px,3.5vw,26px)', color: 'var(--fg-1)', lineHeight: 2 }}>
              ﴿ مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ أَضْعَافًا كَثِيرَةً ﴾
            </div>
            <div style={{ fontSize: 12, color: 'var(--accent-warm)', marginTop: 8, letterSpacing: '0.15em', fontFamily: 'var(--font-arabic-display)' }}>
              البقرة · ٢٤٥
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
