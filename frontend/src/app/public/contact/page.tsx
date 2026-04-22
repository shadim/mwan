'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n-context';

function T({ ar, en }: { ar: string; en: string }) {
  const { t } = useI18n();
  return <>{t(ar, en)}</>;
}

export default function ContactPage() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 8,
    border: '1px solid var(--border)', background: 'var(--bg-card)',
    color: 'var(--fg-1)', fontSize: 14, fontFamily: 'var(--font-arabic-body)', outline: 'none',
  };

  return (
    <>
      <div style={{ background: 'var(--green-800)', color: '#fff', padding: 'clamp(48px,8vw,80px) 24px', textAlign: 'center' }}>
        <div className="pub-eyebrow" style={{ justifyContent: 'center', color: 'var(--accent-warm)' }}><T ar="نحن هنا لمساعدتك" en="We're Here to Help" /></div>
        <h1 style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, margin: '16px 0 0' }}>
          <T ar="تواصل معنا" en="Contact Us" />
        </h1>
      </div>

      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
          <div>
            <div className="pub-eyebrow"><T ar="معلومات التواصل" en="Contact Information" /></div>
            <h2 className="pub-title"><T ar="تفضّل بزيارتنا" en="Come Visit Us" /></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '📍', ar: 'النقب، فلسطين', en: 'Negev, Palestine', subAr: 'شارع المدرسة الرئيسي', subEn: 'Main School Street' },
                { icon: '☎', ar: '٠٤ ٦٢٣ ٨٨٩١', en: '04-623-8891', subAr: 'الأحد — الخميس · ٧:٣٠ — ٢:٠٠', subEn: 'Sun — Thu · 7:30 — 2:00' },
                { icon: '✉', ar: 'info@almohajirin.edu', en: 'info@almohajirin.edu', subAr: 'نرد خلال ٢٤ ساعة', subEn: 'We reply within 24 hours' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 18 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: 'color-mix(in srgb, var(--accent) 12%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}><T ar={c.ar} en={c.en} /></div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}><T ar={c.subAr} en={c.subEn} /></div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', height: 180, background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-3)', fontSize: 13, fontFamily: 'monospace' }}>
              [ map placeholder ]
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 'clamp(20px,4vw,32px)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}><T ar="تم الإرسال بنجاح" en="Sent Successfully" /></div>
                <p style={{ fontSize: 14, color: 'var(--fg-3)', marginTop: 8 }}><T ar="سنتواصل معك في أقرب وقت إن شاء الله" en="We'll get back to you soon, insha'Allah" /></p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: 'general', message: '' }); }} style={{ marginTop: 16, background: 'var(--accent)', color: 'var(--on-accent)', padding: '10px 24px', borderRadius: 8, border: 'none', fontFamily: 'var(--font-arabic-display)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  <T ar="رسالة جديدة" en="New Message" />
                </button>
              </div>
            ) : (
              <>
                <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)', marginBottom: 20 }}><T ar="أرسل لنا رسالة" en="Send Us a Message" /></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-arabic-display)', fontSize: 13, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 6 }}><T ar="الاسم الكامل" en="Full Name" /></label>
                    <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder={t('أدخل اسمك', 'Enter your name')} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-arabic-display)', fontSize: 13, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 6 }}><T ar="البريد" en="Email" /></label>
                      <input type="email" style={inputStyle} value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-arabic-display)', fontSize: 13, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 6 }}><T ar="الهاتف" en="Phone" /></label>
                      <input type="tel" style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="05x-xxx-xxxx" />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-arabic-display)', fontSize: 13, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 6 }}><T ar="الموضوع" en="Subject" /></label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.subject} onChange={e => set('subject', e.target.value)}>
                      <option value="general">{t('استفسار عام', 'General Inquiry')}</option>
                      <option value="register">{t('التسجيل', 'Registration')}</option>
                      <option value="donate">{t('التبرعات', 'Donations')}</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-arabic-display)', fontSize: 13, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 6 }}><T ar="الرسالة" en="Message" /></label>
                    <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={form.message} onChange={e => set('message', e.target.value)} placeholder={t('اكتب رسالتك هنا...', 'Write your message here...')} />
                  </div>
                  <button onClick={() => setSubmitted(true)} style={{ width: '100%', padding: '14px', borderRadius: 8, border: 'none', background: 'var(--accent)', color: 'var(--on-accent)', fontFamily: 'var(--font-arabic-display)', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-accent)' }}>
                    <T ar="إرسال الرسالة" en="Send Message" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
