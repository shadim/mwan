'use client';

import { useI18n } from '@/lib/i18n-context';
import { useAuth } from '@/lib/auth-context';
import { Star } from '@/components/ui';
import Link from 'next/link';
import { useState } from 'react';
import styles from './public.module.css';

const NAV_LINKS = [
  { ar: 'الرئيسية', en: 'Home', href: '/' },
  { ar: 'عنّا', en: 'About', href: '/public/about' },
  { ar: 'البرامج', en: 'Programs', href: '/public/programs' },
  { ar: 'الأخبار', en: 'News', href: '/public/news' },
  { ar: 'تواصل', en: 'Contact', href: '/public/contact' },
];

function UtilBar() {
  const { t, lang, setLang } = useI18n();
  return (
    <div className={styles.utilBar}>
      <span>{t('☎ ٠٤ ٦٢٣ ٨٨٩١', '☎ 04-623-8891')}</span>
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
            <div className={styles.brandTitle}>المهاجرين والأنصار</div>
            <div className={styles.brandSub}>MADRASA · EST 1426H</div>
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
          <Link href="/public/contact" className={styles.navCta}>
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
          <Link href="/public/contact" className={styles.mobileCta} onClick={() => setOpen(false)}>
            {t('سجّل الآن', 'Register Now')}
          </Link>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  const { t, lang } = useI18n();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div>
          <div className={styles.footerBrand}>
            <Star size={24} color="var(--brass-300)" />
            <span>المهاجرين والأنصار</span>
          </div>
          <p className={styles.footerDesc}>
            {t('مدرسة قرآنية تعليمية تجمع بين الأصالة والعلوم الحديثة، تأسست عام ١٤٢٦ هـ',
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
            {t('☎ ٠٤ ٦٢٣ ٨٨٩١', '☎ 04-623-8891')}<br />
            ✉ info@almohajirin.edu<br />
            {t('📍 النقب، فلسطين', '📍 Negev, Palestine')}
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        {t('© ١٤٤٧ هـ / ٢٠٢٦ م · مدرسة المهاجرين والأنصار · جميع الحقوق محفوظة',
           '© 1447H / 2026 · Almohajirin wel Ansar Madrasa · All rights reserved')}
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

// Export shared components for use in pages
export { NAV_LINKS };
