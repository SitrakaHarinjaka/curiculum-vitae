import { prisma } from '../config/prisma';

export async function getTranslationsMap(
  entity: string,
  entityId: number,
  locale: string
): Promise<Record<string, string>> {
  const translations = await prisma.translation.findMany({
    where: { entity, entityId, locale },
  });
  const map: Record<string, string> = {};
  for (const t of translations) {
    map[t.field] = t.value;
  }
  return map;
}

export async function getTranslationsForMany(
  entity: string,
  entityIds: number[],
  locale: string
): Promise<Map<number, Record<string, string>>> {
  const translations = await prisma.translation.findMany({
    where: { entity, entityId: { in: entityIds }, locale },
  });
  const result = new Map<number, Record<string, string>>();
  for (const t of translations) {
    if (!result.has(t.entityId)) result.set(t.entityId, {});
    result.get(t.entityId)![t.field] = t.value;
  }
  return result;
}

export function mergeTranslations<T extends Record<string, unknown>>(
  data: T,
  translations: Record<string, string>
): T {
  const merged = { ...data };
  for (const [field, value] of Object.entries(translations)) {
    if (field in merged && value) {
      (merged as Record<string, unknown>)[field] = value;
    }
  }
  return merged;
}

export function mergeTranslationsList<T extends { id: number } & Record<string, unknown>>(
  items: T[],
  translationsMap: Map<number, Record<string, string>>
): T[] {
  return items.map(item => {
    const trans = translationsMap.get(item.id);
    return trans ? mergeTranslations(item, trans) : item;
  });
}
