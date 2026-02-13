import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export async function getEducation(_req: Request, res: Response) {
  const education = await prisma.education.findMany({ orderBy: { sortOrder: 'asc' } });
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
