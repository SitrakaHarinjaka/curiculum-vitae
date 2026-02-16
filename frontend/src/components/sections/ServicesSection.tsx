'use client';

import { Service } from '@/lib/types';
import { useInView } from '@/hooks/useInView';
import { Code, Globe, Palette } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  wordpress: Globe,
  palette: Palette,
};

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="about" className="py-20 bg-[linear-gradient(135deg,#240839_5%,#082252_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Mes <span className="text-accent">services</span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(services.length > 0 ? services : defaultServices).map((service, index) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <div
                key={service.id}
                className={`group bg-bg-card border border-border rounded-xl p-8 hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 ${
                  isInView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Icon className="text-accent" size={28} />
                </div>
                <h3 className="text-lg font-semibold mb-4 text-text-primary group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const defaultServices: Service[] = [
  { id: 1, title: 'Développement Front-End React / Next.js', icon: 'code', description: "Je conçois et développe des interfaces modernes, performantes et customisables en React et Next.js.", sortOrder: 1 },
  { id: 2, title: 'Développement de Sites WordPress', icon: 'wordpress', description: "Je crée des sites WordPress professionnels, personnalisés et faciles à gérer.", sortOrder: 2 },
  { id: 3, title: 'Web Design & Design UI/UX', icon: 'palette', description: "Je réalise des designs web élégants, intuitifs et centrés utilisateur.", sortOrder: 3 },
];
