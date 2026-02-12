import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export async function getBiography(_req: Request, res: Response) {
  const bio = await prisma.biography.findFirst();
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
