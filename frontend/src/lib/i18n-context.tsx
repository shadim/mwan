'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'ar' | 'en';

interface I18nContextType {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  setLang: (lang: Lang) => void;
  t: (ar: string, en: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'ar',
  dir: 'rtl',
  setLang: () => {},
  t: (ar) => ar,
});

export function useI18n() { return useContext(I18nContext); }

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('awa-lang') as Lang;
    if (saved === 'ar' || saved === 'en') setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('awa-lang', l);
    document.documentElement.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', l);
  };

  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const t = (ar: string, en: string) => lang === 'ar' ? ar : en;

  return (
    <I18nContext.Provider value={{ lang, dir, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}
