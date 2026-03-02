import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { getTranslationsForMany, mergeTranslationsList } from '../services/translation.service';

export async function getExperiences(req: Request, res: Response) {
  const experiences = await prisma.experience.findMany({ orderBy: { sortOrder: 'asc' } });
  const lang = req.query.lang as string;
  if (lang && lang !== 'fr' && experiences.length > 0) {
    const trans = await getTranslationsForMany('experience', experiences.map((e: { id: number }) => e.id), lang);
    return res.json({ success: true, data: mergeTranslationsList(experiences, trans) });
  }
  return res.json({ success: true, data: experiences });
}

export async function createExperience(req: Request, res: Response) {
  const data = {
    ...req.body,
    startDate: new Date(req.body.startDate),
    endDate: req.body.endDate ? new Date(req.body.endDate) : null,
  };
  const experience = await prisma.experience.create({ data });
  return res.status(201).json({ success: true, data: experience });
}

export async function updateExperience(req: Request, res: Response) {
  const { id } = req.params;
  const data = {
    ...req.body,
    startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
    endDate: req.body.endDate ? new Date(req.body.endDate) : null,
  };
  const experience = await prisma.experience.update({ where: { id: Number(id) }, data });
  return res.json({ success: true, data: experience });
}

export async function deleteExperience(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.experience.delete({ where: { id: Number(id) } });
  return res.json({ success: true, message: 'Expérience supprimée' });
}
