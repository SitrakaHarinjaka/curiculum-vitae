import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export async function getExperiences(_req: Request, res: Response) {
  const experiences = await prisma.experience.findMany({ orderBy: { sortOrder: 'asc' } });
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
