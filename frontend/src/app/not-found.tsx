'use client';

import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';

export default function NotFound() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <p className="text-xl text-text-secondary mb-8">{t.notFound.title}</p>
        <Link
          href="/"
          className="px-6 py-3 bg-accent text-bg-primary rounded-full hover:bg-accent-hover transition-colors"
        >
          {t.notFound.back}
        </Link>
      </div>
    </div>
  );
}
