'use client';

import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n-context';
import { Star } from '@/components/ui';
import { useRouter, usePathname } from 'next/navigation';
import styles from './app-shell.module.css';

interface Tab {
  icon: string;
  ar: string;
  en: string;
  path: string;
}

interface AppShellProps {
  tabs: Tab[];
  role: string;
  roleEn: string;
  children: React.ReactNode;
}

export function AppShell({ tabs, role, roleEn, children }: AppShellProps) {
  const { user, logout } = useAuth();
  const { t, lang, setLang } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const activeIdx = tabs.findIndex(tab => pathname.startsWith(tab.path));
  const initials = user?.nameAr?.slice(0, 2) || '??';

  return (
    <div className={styles.shell}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.brand}>
          <Star size={20} color="var(--accent)" />
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>المهاجرين والأنصار</span>
            <span className={styles.brandRole}>{t(role, roleEn)}</span>
          </div>
        </div>
        <div className={styles.topActions}>
          <button className={styles.langBtn} onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          <button className={styles.logoutBtn} onClick={() => { logout(); router.push('/login'); }}>
            {t('خروج', 'Logout')}
          </button>
          <div className={styles.avatar}>{initials}</div>
        </div>
      </div>

      <div className={styles.mainWrap}>
        {/* Side rail — desktop */}
        <nav className={styles.sideRail}>
          {tabs.map((tab, i) => (
            <button key={tab.path} onClick={() => router.push(tab.path)}
              className={`${styles.railLink} ${i === activeIdx ? styles.railLinkActive : ''}`}
              title={t(tab.ar, tab.en)}>
              <span>{tab.icon}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className={styles.content}>
          <div className={styles.contentInner}>{children}</div>
        </main>
      </div>

      {/* Bottom tabs — mobile */}
      <nav className={styles.bottomTabs}>
        {tabs.map((tab, i) => (
          <button key={tab.path} onClick={() => router.push(tab.path)}
            className={`${styles.bottomTab} ${i === activeIdx ? styles.bottomTabActive : ''}`}>
            <span className={styles.bottomTabIcon}>{tab.icon}</span>
            <span className={styles.bottomTabLabel}>{t(tab.ar, tab.en)}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
