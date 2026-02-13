import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export async function getSkills(_req: Request, res: Response) {
  const skills = await prisma.skill.findMany({ orderBy: { sortOrder: 'asc' } });
  return res.json({ success: true, data: skills });
}

export async function createSkill(req: Request, res: Response) {
  const skill = await prisma.skill.create({ data: req.body });
  return res.status(201).json({ success: true, data: skill });
}

export async function updateSkill(req: Request, res: Response) {
  const { id } = req.params;
  const skill = await prisma.skill.update({ where: { id: Number(id) }, data: req.body });
  return res.json({ success: true, data: skill });
}

export async function deleteSkill(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.skill.delete({ where: { id: Number(id) } });
  return res.json({ success: true, message: 'Compétence supprimée' });
}

export async function reorderSkills(req: Request, res: Response) {
  const { items } = req.body as { items: { id: number; sortOrder: number }[] };
  await Promise.all(
    items.map(item =>
      prisma.skill.update({ where: { id: item.id }, data: { sortOrder: item.sortOrder } })
    )
  );
  return res.json({ success: true, message: 'Ordre mis à jour' });
}
