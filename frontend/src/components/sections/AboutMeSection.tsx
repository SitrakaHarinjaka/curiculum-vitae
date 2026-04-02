'use client';


import { useLocale } from '@/context/LocaleContext';


export function AboutMeSection({ about }: { about: string }) {
  const { t } = useLocale();
  const descriptionText = (about || '');

  return (
    <section id="home" className="relative flex items-center py-20 bg-[linear-gradient(135deg,#052050_0%,#240839_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.about.title} <span className="text-accent">{t.about.titleAccent}</span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
                <p>{descriptionText}</p>
            </div>
        </div>
      </div>
    </section>
  );
}
