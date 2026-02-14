import { GeoData } from '../types';
import { logger } from '../utils/logger';

const geoCache = new Map<string, { data: GeoData; expires: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function getGeolocation(ip: string): Promise<GeoData | null> {
  const cached = geoCache.get(ip);
  if (cached && cached.expires > Date.now()) return cached.data;

  try {
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city`
    );
    const data = await response.json() as GeoData;

    if (data.status === 'success') {
      geoCache.set(ip, { data, expires: Date.now() + CACHE_TTL });
      return data;
    }
    return null;
  } catch (err) {
    logger.error('Geolocation error:', err);
    return null;
  }
}
