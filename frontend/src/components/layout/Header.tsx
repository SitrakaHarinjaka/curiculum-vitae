'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, t, setLocale } = useLocale();

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#service', label: t.nav.service },
    { href: '#resume', label: t.nav.resume },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="text-xl font-bold text-accent">
            SH
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-text-white font-bold hover:text-accent transition-colors duration-300 tracking-wider"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
              className="cursor-pointer flex items-center gap-1.5 text-xs font-bold tracking-wider text-text-white hover:text-accent transition-colors duration-300"
            >
              <span>{locale === 'fr' ? '🇬🇧' : '🇫🇷'}</span>
              {locale === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-sm text-text-secondary hover:text-accent transition-colors tracking-wider"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-1.5 py-3 text-sm font-bold tracking-wider text-text-secondary hover:text-accent transition-colors duration-300"
            >
              <span>{locale === 'fr' ? '🇬🇧' : '🇫🇷'}</span>
              {locale === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
