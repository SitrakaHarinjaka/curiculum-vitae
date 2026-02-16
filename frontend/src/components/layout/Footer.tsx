import { SocialLink } from '@/lib/types';
import { Facebook, Linkedin, Globe, Dribbble } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  facebook: Facebook,
  linkedin: Linkedin,
  upwork: Globe,
  behance: Globe,
  dribbble: Dribbble,
};

interface FooterProps {
  socialLinks: SocialLink[];
}

export function Footer({ socialLinks }: FooterProps) {
  return (
    <footer className="bg-bg-secondary border-t border-border bg-[linear-gradient(135deg,#052050_60%,#240839_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-bg-primary font-bold">
              SH
            </div>
            <div>
              <p className="text-text-primary font-semibold">Sitraka Harinjaka</p>
              <p className="text-sm text-text-secondary">Développeur Front-End</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            {['Home', 'Portfolio', 'Blog', 'Contact'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map(link => {
              const Icon = iconMap[link.icon] || Globe;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-bg-card flex items-center justify-center text-text-secondary hover:bg-accent hover:text-bg-primary transition-all duration-300"
                  aria-label={link.platform}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} Sitraka Harinjaka. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
