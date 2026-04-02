import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { getGeolocation } from '../services/geolocation.service';
import { logger } from '../utils/logger';

export function visitorTracker(req: Request, _res: Response, next: NextFunction) {
  trackVisit(req).catch(err => logger.error('Visitor tracking error:', err));
  next();
}

async function trackVisit(req: Request) {
  const ip = extractIp(req);
  if (isPrivateIp(ip)) return;

  const referrer = (req.headers['referer'] || req.headers['referrer'] || null) as string | null;
  const userAgent = req.headers['user-agent'] || null;
  const pageVisited = req.originalUrl;

  const geo = await getGeolocation(ip);
  const ua = userAgent || req.headers['user-agent'] || '';
  const isBot = /bot|crawl|spider|slurp|curl|wget|python|node/i.test(ua);

  await prisma.visitor.create({
    data: {
      ip,
      region: geo?.regionName || null,
      city: geo?.city || null,
      country: geo?.country || null,
      countryCode: geo?.countryCode || null,
      referrer,
      userAgent,
      pageVisited,
      isBot
    },
  });
}

function extractIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function isPrivateIp(ip: string): boolean {
  return (
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.16.') ||
    ip === 'unknown'
  );
}
