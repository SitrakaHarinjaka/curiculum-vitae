import { fr } from './fr';
import { en } from './en';

export type Locale = 'fr' | 'en';
export type Dictionary = typeof fr;

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.fr;
}
