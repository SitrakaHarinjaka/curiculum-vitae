import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import { SITE_CONFIG } from '@/lib/constants';
import { getDictionary, type Locale } from '@/lib/i18n';
import { LocaleProvider } from '@/context/LocaleContext';
import { TrackingScript } from '@/components/sections/TrackingScript';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const viewport: Viewport = {
  themeColor: '#052050',
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return {
    title: {
      default: t.meta.title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: t.meta.description,
    keywords: locale === 'fr'
      ? ['développeur full stack js', 'React', 'Next.js', 'Vue.js', 'Sitraka Harinjaka', 'développeur web', 'freelance', 'nodejs', 'express', 'nestjs']
      : ['full stack js developer', 'React', 'Next.js', 'Vue.js', 'Sitraka Harinjaka', 'web developer', 'freelance', 'nodejs', 'express', 'nestjs'],
    authors: [{ name: SITE_CONFIG.name }],
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      siteName: SITE_CONFIG.name,
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value;
  if (localeCookie === 'en' || localeCookie === 'fr') return localeCookie;

  const headerStore = await headers();
  const acceptLang = headerStore.get('accept-language') || '';
  if (acceptLang.startsWith('en')) return 'en';
  return 'fr';
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-[family-name:var(--font-poppins)] antialiased">
        <LocaleProvider initialLocale={locale}>
          {children}
          <TrackingScript />
        </LocaleProvider>
      </body>
    </html>
  );
}
