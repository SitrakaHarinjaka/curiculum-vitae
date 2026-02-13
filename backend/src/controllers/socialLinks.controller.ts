import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export async function getSocialLinks(_req: Request, res: Response) {
  const links = await prisma.socialLink.findMany({ orderBy: { sortOrder: 'asc' } });
  return res.json({ success: true, data: links });
}

export async function createSocialLink(req: Request, res: Response) {
  const link = await prisma.socialLink.create({ data: req.body });
  return res.status(201).json({ success: true, data: link });
}

export async function updateSocialLink(req: Request, res: Response) {
  const { id } = req.params;
  const link = await prisma.socialLink.update({ where: { id: Number(id) }, data: req.body });
  return res.json({ success: true, data: link });
}

export async function deleteSocialLink(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.socialLink.delete({ where: { id: Number(id) } });
  return res.json({ success: true, message: 'Lien social supprimé' });
}
