import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export async function getServices(_req: Request, res: Response) {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } });
  return res.json({ success: true, data: services });
}

export async function createService(req: Request, res: Response) {
  const service = await prisma.service.create({ data: req.body });
  return res.status(201).json({ success: true, data: service });
}

export async function updateService(req: Request, res: Response) {
  const { id } = req.params;
  const service = await prisma.service.update({ where: { id: Number(id) }, data: req.body });
  return res.json({ success: true, data: service });
}

export async function deleteService(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.service.delete({ where: { id: Number(id) } });
  return res.json({ success: true, message: 'Service supprimé' });
}
