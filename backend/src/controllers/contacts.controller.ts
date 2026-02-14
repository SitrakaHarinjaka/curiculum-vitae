import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { sendContactNotification } from '../services/email.service';

export async function submitContact(req: Request, res: Response) {
  const contact = await prisma.contact.create({ data: req.body });

  // Fire-and-forget email notification
  sendContactNotification(req.body).catch(() => {});

  return res.status(201).json({ success: true, data: contact, message: 'Message envoyé avec succès' });
}

export async function getContacts(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;

  const [contacts, total] = await Promise.all([
    prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.contact.count(),
  ]);

  return res.json({
    success: true,
    data: contacts,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function markAsRead(req: Request, res: Response) {
  const { id } = req.params;
  const contact = await prisma.contact.update({
    where: { id: Number(id) },
    data: { isRead: true },
  });
  return res.json({ success: true, data: contact });
}

export async function deleteContact(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.contact.delete({ where: { id: Number(id) } });
  return res.json({ success: true, message: 'Message supprimé' });
}

export async function getUnreadCount(_req: Request, res: Response) {
  const count = await prisma.contact.count({ where: { isRead: false } });
  return res.json({ success: true, data: { count } });
}
