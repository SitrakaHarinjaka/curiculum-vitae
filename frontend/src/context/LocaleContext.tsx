'use client';

import { createContext, useContext, useCallback, useState } from 'react';
import { getDictionary, type Locale, type Dictionary } from '@/lib/i18n';

interface LocaleContextType {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const t = getDictionary(locale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `locale=${newLocale};path=/;max-age=${365 * 24 * 60 * 60}`;
    window.location.reload();
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
