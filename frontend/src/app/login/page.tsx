'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n-context';
import styles from './login.module.css';

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const { t, lang, setLang } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || t('خطأ في تسجيل الدخول', 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (response: any) => {
    try {
      await loginWithGoogle(response.credential);
      router.push('/');
    } catch (err: any) {
      setError(err.message || t('خطأ في تسجيل الدخول بجوجل', 'Google login failed'));
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>✦</div>
          <h1 className={styles.logoTitle}>المهاجرين والأنصار</h1>
          <p className={styles.logoSub}>MADRASA · EST 1426H</p>
        </div>

        {/* Lang toggle */}
        <div className={styles.langToggle}>
          <button onClick={() => setLang('ar')} className={lang === 'ar' ? styles.langActive : ''}>AR</button>
          <button onClick={() => setLang('en')} className={lang === 'en' ? styles.langActive : ''}>EN</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.formTitle}>{t('تسجيل الدخول', 'Sign In')}</h2>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label>{t('البريد الإلكتروني', 'Email')}</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder={t('أدخل بريدك الإلكتروني', 'Enter your email')} required />
          </div>

          <div className={styles.field}>
            <label>{t('كلمة المرور', 'Password')}</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder={t('أدخل كلمة المرور', 'Enter your password')} required />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? t('جاري الدخول...', 'Signing in...') : t('دخول', 'Sign In')}
          </button>

          <div className={styles.divider}>
            <span>{t('أو', 'or')}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError(t('فشل تسجيل الدخول بجوجل', 'Google login failed'))}
              text="signin_with"
              shape="rectangular"
              locale={lang === 'ar' ? 'ar' : 'en'}
            />
          </div>
        </form>

        <a href="/public" className={styles.publicLink}>
          {t('زيارة الموقع العام ←', 'Visit public site →')}
        </a>
      </div>
    </div>
  );
}
