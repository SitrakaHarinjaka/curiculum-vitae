import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

const TRANSLATABLE_FIELDS: Record<string, string[]> = {
  biography: ['title', 'subtitle', 'aboutText', 'aboutLongText','nationality', 'languages', 'freelance'],
  skill: ['name', 'category'],
  education: ['degree', 'field', 'description'],
  experience: ['role', 'description'],
  service: ['title', 'description'],
};

export async function getTranslationsByEntity(req: Request, res: Response) {
  const { entity, entityId } = req.query;

  const where: Record<string, unknown> = {};
  if (entity) where.entity = entity;
  if (entityId) where.entityId = Number(entityId);

  const translations = await prisma.translation.findMany({
    where,
    orderBy: [{ entity: 'asc' }, { entityId: 'asc' }, { field: 'asc' }],
  });

  return res.json({ success: true, data: translations });
}

export async function getAllTranslatable(_req: Request, res: Response) {
  const [biography, skills, education, experiences, services] = await Promise.all([
    prisma.biography.findFirst(),
    prisma.skill.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.education.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.experience.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.service.findMany({ orderBy: { sortOrder: 'asc' } }),
  ]);

  const translations = await prisma.translation.findMany({
    where: { locale: 'en' },
  });

  const transMap = new Map<string, string>();
  for (const t of translations) {
    transMap.set(`${t.entity}:${t.entityId}:${t.field}`, t.value);
  }

  const buildItems = (entity: string, items: Array<Record<string, unknown>>) =>
    items.map(item => {
      const fields = TRANSLATABLE_FIELDS[entity] || [];
      const translatedFields: Record<string, { fr: unknown; en: string }> = {};
      for (const field of fields) {
        if (item[field] !== undefined) {
          translatedFields[field] = {
            fr: item[field],
            en: transMap.get(`${entity}:${item.id}:${field}`) || '',
          };
        }
      }
      return { id: item.id, label: getLabel(entity, item), fields: translatedFields };
    });

  const data = {
    biography: biography ? buildItems('biography', [biography as unknown as Record<string, unknown>]) : [],
    skill: buildItems('skill', skills as unknown as Array<Record<string, unknown>>),
    education: buildItems('education', education as unknown as Array<Record<string, unknown>>),
    experience: buildItems('experience', experiences as unknown as Array<Record<string, unknown>>),
    service: buildItems('service', services as unknown as Array<Record<string, unknown>>),
  };

  return res.json({ success: true, data });
}

export async function upsertTranslations(req: Request, res: Response) {
  const { translations } = req.body as {
    translations: Array<{ entity: string; entityId: number; field: string; locale: string; value: string }>;
  };

  if (!translations || !Array.isArray(translations)) {
    return res.status(400).json({ success: false, message: 'translations array required' });
  }

  for (const t of translations) {
    const allowed = TRANSLATABLE_FIELDS[t.entity];
    if (!allowed || !allowed.includes(t.field)) continue;

    if (!t.value || t.value.trim() === '') {
      await prisma.translation.deleteMany({
        where: { entity: t.entity, entityId: t.entityId, field: t.field, locale: t.locale },
      });
    } else {
      await prisma.translation.upsert({
        where: {
          entity_entityId_field_locale: {
            entity: t.entity,
            entityId: t.entityId,
            field: t.field,
            locale: t.locale,
          },
        },
        update: { value: t.value },
        create: {
          entity: t.entity,
          entityId: t.entityId,
          field: t.field,
          locale: t.locale,
          value: t.value,
        },
      });
    }
  }

  return res.json({ success: true, message: 'Traductions mises à jour' });
}

function getLabel(entity: string, item: Record<string, unknown>): string {
  switch (entity) {
    case 'biography': return (item.fullName as string) || 'Biographie';
    case 'skill': return (item.name as string) || '';
    case 'education': return `${item.degree} - ${item.school}`;
    case 'experience': return `${item.role} @ ${item.company}`;
    case 'service': return (item.title as string) || '';
    default: return String(item.id);
  }
}
