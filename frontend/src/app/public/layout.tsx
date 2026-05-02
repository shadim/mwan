'use client';

import { useI18n } from '@/lib/i18n-context';
import { useAuth } from '@/lib/auth-context';
import { Star, T } from '@/components/ui';
import { getHijriYear, getGregorianYear } from '@/lib/hijri';
import Link from 'next/link';
import { useState } from 'react';
import styles from './public.module.css';

const NAV_LINKS = [
  { ar: 'الرئيسية', en: 'Home', href: '/' },
  // { ar: 'عنّا', en: 'About', href: '/public/about' },
  // { ar: 'البرامج', en: 'Programs', href: '/public/programs' },
  // { ar: 'الأخبار', en: 'News', href: '/public/news' },
  { ar: 'تواصل', en: 'Contact', href: '/public/contact' },
];

function UtilBar() {
  const { t, lang, setLang } = useI18n();
  return (
    <div className={styles.utilBar}>
      <span>{t('☎ 052-5534466, 053-8084944', '☎ 04-623-8891')}</span>
      <div className={styles.langBtns}>
        {(['ar', 'en'] as const).map(l => (
          <button key={l} onClick={() => setLang(l)}
            className={lang === l ? styles.langActive : styles.langInactive}>
            {l.toUpperCase()} {lang === l ? '●' : ''}
          </button>
        ))}
      </div>
    </div>
  );
}

function Navbar() {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const portalHref = user ? `/dashboard/${user.role}` : '/login';
  const portalLabel = user
    ? t('لوحتي', 'My Dashboard')
    : t('دخول', 'Login');

  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.navBrand}>
          <Star size={28} color="var(--accent)" />
          <div>
            <div className={styles.brandTitle}><T ar="المهاجرين والأنصار" en="Almohajirin wel Ansar" /></div>
            <div className={styles.brandSub}><T ar="مدرسة · تأسست ١٤٤٥ هـ" en="MADRASA · EST 1445H" /></div>
          </div>
        </Link>
        <div className={styles.navLinks}>
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className={styles.navLink}>
              {lang === 'ar' ? l.ar : l.en}
            </Link>
          ))}
        </div>
        <div className={styles.navActions}>
          <Link href={portalHref} className={styles.navLogin}>
            {portalLabel}
          </Link>
          <Link href="/public/register" className={styles.navCta}>
            {t('سجّل الآن', 'Register Now')}
          </Link>
        </div>
        <button className={styles.hamburger} onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </div>
      {open && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className={styles.mobileLink} onClick={() => setOpen(false)}>
              {lang === 'ar' ? l.ar : l.en}
            </Link>
          ))}
          <Link href={portalHref} className={styles.mobileLink} onClick={() => setOpen(false)}>
            {portalLabel}
          </Link>
          <Link href="/public/register" className={styles.mobileCta} onClick={() => setOpen(false)}>
            {t('سجّل الآن', 'Register Now')}
          </Link>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  const { t, lang } = useI18n();
  const hijri = getHijriYear();
  const gYear = getGregorianYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div>
          <div className={styles.footerBrand}>
            <Star size={24} color="var(--brass-300)" />
            <span><T ar="المهاجرين والأنصار" en="Almohajirin wel Ansar" /></span>
          </div>
          <p className={styles.footerDesc}>
            {t('مدرسة قرآنية تعليمية تجمع بين الأصالة والعلوم الحديثة، تأسست عام ١٤٤٥ هـ',
               'A Quranic educational school blending tradition and modern sciences, est. 1426H')}
          </p>
        </div>
        <div>
          <div className={styles.footerHeading}>{t('روابط سريعة', 'Quick Links')}</div>
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className={styles.footerLink}>
              {lang === 'ar' ? l.ar : l.en}
            </Link>
          ))}
        </div>
        <div>
          <div className={styles.footerHeading}>{t('تواصل معنا', 'Contact Us')}</div>
          <div className={styles.footerContact}>
            {t('☎ 052-5534466, 053-8084944', '☎ 04-623-8891')}<br />
            ✉ almohagren96@gmail.com<br />
            {t('📍 كفرقرع، المثلث', '📍 Negev, Palestine')}
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        {t(`© ${hijri.arH} / ${gYear} م · مدرسة المهاجرين والأنصار · جميع الحقوق محفوظة`,
           `© ${hijri.enH} / ${gYear} · Almohajirin wel Ansar Madrasa · All rights reserved`)}
      </div>
    </footer>
  );
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-mint" data-theme="mint" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <UtilBar />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

