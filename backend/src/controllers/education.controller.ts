import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { getTranslationsForMany, mergeTranslationsList } from '../services/translation.service';

export async function getEducation(req: Request, res: Response) {
  const education = await prisma.education.findMany({ orderBy: { sortOrder: 'asc' } });
  const lang = req.query.lang as string;
  if (lang && lang !== 'fr' && education.length > 0) {
    const trans = await getTranslationsForMany('education', education.map((e: { id: number }) => e.id), lang);
    return res.json({ success: true, data: mergeTranslationsList(education, trans) });
  }
  return res.json({ success: true, data: education });
}

export async function createEducation(req: Request, res: Response) {
  const data = {
    ...req.body,
    startDate: new Date(req.body.startDate),
    endDate: req.body.endDate ? new Date(req.body.endDate) : null,
  };
  const education = await prisma.education.create({ data });
  return res.status(201).json({ success: true, data: education });
}

export async function updateEducation(req: Request, res: Response) {
  const { id } = req.params;
  const data = {
    ...req.body,
    startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
    endDate: req.body.endDate ? new Date(req.body.endDate) : null,
  };
  const education = await prisma.education.update({ where: { id: Number(id) }, data });
  return res.json({ success: true, data: education });
}

export async function deleteEducation(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.education.delete({ where: { id: Number(id) } });
  return res.json({ success: true, message: 'Formation supprimée' });
}
