import { fetchApi } from '@/lib/api';
import { Biography, Skill, Education, Experience, Service, SocialLink } from '@/lib/types';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ParcoursSection } from '@/components/sections/ParcoursSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { JsonLd } from '@/components/seo/JsonLd';

export default async function Home() {
  const [biography, skills, education, experiences, services, socialLinks] = await Promise.all([
    fetchApi<Biography>('/biography'),
    fetchApi<Skill[]>('/skills'),
    fetchApi<Education[]>('/education'),
    fetchApi<Experience[]>('/experiences'),
    fetchApi<Service[]>('/services'),
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
