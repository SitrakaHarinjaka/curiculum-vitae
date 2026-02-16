import Image from 'next/image';
import { Biography, SocialLink } from '@/lib/types';
import { Facebook, Linkedin, Globe, Dribbble, Download, ChevronRight } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  facebook: Facebook,
  linkedin: Linkedin,
  upwork: Globe,
  behance: Globe,
  dribbble: Dribbble,
};

interface HeroSectionProps {
  biography: Biography | null;
  socialLinks: SocialLink[];
}

export function HeroSection({ biography, socialLinks }: HeroSectionProps) {
  const nameParts = (biography?.fullName || 'Sitraka Harinjaka').split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 bg-[linear-gradient(135deg,#052050_0%,#240839_100%)]">
      {/* Background gradient */}
      <div className="absolute inset-0 from-bg-primary via-bg-secondary to-bg-primary" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <p className="text-accent text-sm tracking-widest mb-4">
              ✦ {biography?.subtitle || 'Bienvenue dans mon Curriculum Vitae'}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Hello, Je suis{' '}
              <span className="text-accent">{firstName}</span>{' '}
              {lastName}
            </h1>
            <h2 className="text-lg text-text-primary font-bold mb-6">
              {biography?.title || 'Développeur Front-End'}
            </h2>
            <p className="text-text-primary text-sm leading-relaxed mb-8 max-w-lg">
              {biography?.aboutText}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                target="_blank"
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-accent text-accent rounded-full hover:bg-accent hover:text-bg-primary transition-all duration-300"
              >
                Plus d&apos;infos <ChevronRight size={16} />
              </a>
              
                <a
                  href='/docs/cv_sitraka.pdf'
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg-primary rounded-full hover:bg-accent-hover transition-all duration-300 font-medium"
                >
                  <Download size={16} /> CV
                </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.slice(0, 4).map(link => {
                const Icon = iconMap[link.icon] || Globe;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center text-text-secondary hover:bg-accent hover:text-bg-primary hover:border-accent transition-all duration-300"
                    aria-label={link.platform}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Profile image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-accent/10 to-transparent">
                <Image
                    src="/images/profile.png"
                    alt={biography?.fullName || 'Sitraka Harinjaka'}
                    width={384}
                    height={384}
                    className="w-full h-full object-cover"
                    priority
                  />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent/10 rounded-full blur-lg" />
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
