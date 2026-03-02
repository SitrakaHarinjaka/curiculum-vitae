import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { getTranslationsMap, mergeTranslations } from '../services/translation.service';

export async function getBiography(req: Request, res: Response) {
  const bio = await prisma.biography.findFirst();
  if (!bio) return res.json({ success: true, data: null });

  const lang = req.query.lang as string;
  if (lang && lang !== 'fr') {
    const trans = await getTranslationsMap('biography', bio.id, lang);
    return res.json({ success: true, data: mergeTranslations(bio, trans) });
  }
  return res.json({ success: true, data: bio });
}

export async function upsertBiography(req: Request, res: Response) {
  const existing = await prisma.biography.findFirst();
  const data = {
    ...req.body,
    birthday: req.body.birthday ? new Date(req.body.birthday) : null,
  };

  let bio;
  if (existing) {
    bio = await prisma.biography.update({ where: { id: existing.id }, data });
  } else {
    bio = await prisma.biography.create({ data });
  }

  return res.json({ success: true, data: bio });
}
