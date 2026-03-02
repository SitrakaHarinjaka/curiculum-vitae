import { cookies, headers } from 'next/headers';
import { fetchApi } from '@/lib/api';
import { Biography, Skill, Education, Experience, Service, SocialLink } from '@/lib/types';
import { type Locale } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ParcoursSection } from '@/components/sections/ParcoursSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { JsonLd } from '@/components/seo/JsonLd';

async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value;
  if (localeCookie === 'en' || localeCookie === 'fr') return localeCookie;

  const headerStore = await headers();
  const acceptLang = headerStore.get('accept-language') || '';
  if (acceptLang.startsWith('en')) return 'en';
  return 'fr';
}

export default async function Home() {
  const locale = await getLocale();

  const [biography, skills, education, experiences, services, socialLinks] = await Promise.all([
    fetchApi<Biography>('/biography', locale),
    fetchApi<Skill[]>('/skills', locale),
    fetchApi<Education[]>('/education', locale),
    fetchApi<Experience[]>('/experiences', locale),
    fetchApi<Service[]>('/services', locale),
    fetchApi<SocialLink[]>('/social-links'),
  ]);

  return (
    <>
      <JsonLd biography={biography} socialLinks={socialLinks || []} />
      <Header />
      <main>
        <HeroSection biography={biography} socialLinks={socialLinks || []} />
        <ServicesSection services={services || []} />
        <ParcoursSection
          biography={biography}
          skills={skills || []}
          education={education || []}
          experiences={experiences || []}
        />
        <ContactSection biography={biography} socialLinks={socialLinks || []}/>
      </main>
      <Footer socialLinks={socialLinks || []} />
    </>
  );
}
