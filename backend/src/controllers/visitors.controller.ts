import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { getGeolocation } from '../services/geolocation.service';
import { getVisitsOverTime, getTopReferrers, getSummaryStats } from '../services/analytics.service';
import { logger } from '../utils/logger';

export async function trackVisitor(req: Request, res: Response) {
  const ip = extractIp(req);
  const { referrer, page, userAgent } = req.body;

  try {
    const geo = await getGeolocation(ip);
    const visitor = await prisma.visitor.create({
      data: {
        ip,
        region: geo?.regionName || null,
        city: geo?.city || null,
        country: geo?.country || null,
        countryCode: geo?.countryCode || null,
        referrer: referrer || null,
        userAgent: userAgent || req.headers['user-agent'] || null,
        pageVisited: page || '/',
      },
    });
    const suggestedLocale = getLocaleFromCountry(geo?.countryCode);
    return res.status(201).json({ success: true, visitorId: visitor.id, suggestedLocale });
  } catch (err) {
    logger.error('Track visitor error:', err);
    return res.status(201).json({ success: true, suggestedLocale: 'fr' });
  }
}

export async function updateTimeSpent(req: Request, res: Response) {
  const { visitorId, timeSpent } = req.body;

  if (!visitorId || typeof timeSpent !== 'number') {
    return res.status(400).json({ success: false, message: 'visitorId and timeSpent required' });
  }

  try {
    await prisma.visitor.update({
      where: { id: Number(visitorId) },
      data: { timeSpent: Math.round(timeSpent) },
    });
  } catch (err) {
    logger.error('Update time spent error:', err);
  }

  return res.json({ success: true });
}

export async function getVisitors(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;

  const [visitors, total] = await Promise.all([
    prisma.visitor.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.visitor.count(),
  ]);

  return res.json({
    success: true,
    data: visitors,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function getAnalyticsVisits(req: Request, res: Response) {
  const days = parseInt(req.query.days as string) || 30;
  const data = await getVisitsOverTime(days);
  return res.json({ success: true, data });
}

export async function getAnalyticsReferrers(_req: Request, res: Response) {
  const data = await getTopReferrers();
  return res.json({ success: true, data });
}

export async function getAnalyticsSummary(_req: Request, res: Response) {
  const data = await getSummaryStats();
  return res.json({ success: true, data });
}

export async function deleteVisitor(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.visitor.delete({ where: { id: Number(id) } });
  return res.json({ success: true, message: 'Visiteur supprimé' });
}

const ENGLISH_SPEAKING_COUNTRIES = new Set([
  'US', 'GB', 'AU', 'NZ', 'CA', 'IE', 'ZA', 'GH', 'KE', 'NG', 'PH', 'SG', 'JM', 'TT', 'BB',
]);

function getLocaleFromCountry(countryCode: string | null | undefined): 'fr' | 'en' {
  if (!countryCode) return 'fr';
  return ENGLISH_SPEAKING_COUNTRIES.has(countryCode.toUpperCase()) ? 'en' : 'fr';
}

function extractIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}
