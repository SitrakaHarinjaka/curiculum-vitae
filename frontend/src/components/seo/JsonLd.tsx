import { Biography, SocialLink } from '@/lib/types';

interface JsonLdProps {
  biography: Biography | null;
  socialLinks: SocialLink[];
}

export function JsonLd({ biography, socialLinks }: JsonLdProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: biography?.fullName || 'Sitraka Harinjaka',
    jobTitle: biography?.title || 'Développeur Front-End',
    description: biography?.aboutText || '',
    email: biography?.email || '',
    telephone: biography?.phone || '',
    address: biography?.address || '',
    nationality: biography?.nationality || '',
    sameAs: socialLinks.map(l => l.url),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
