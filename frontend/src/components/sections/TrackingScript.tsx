'use client';

import { useEffect, useRef } from 'react';
import { API_BASE_URL } from '@/lib/constants';

export function TrackingScript() {
  const visitorIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const track = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referrer: document.referrer || null,
            page: window.location.pathname,
            userAgent: navigator.userAgent,
          }),
        });
        const data = await res.json();
        if (data.visitorId) {
          visitorIdRef.current = data.visitorId;
        }
        // Set locale cookie from IP detection if no locale preference exists
        if (data.suggestedLocale && !document.cookie.includes('locale=')) {
          document.cookie = `locale=${data.suggestedLocale};path=/;max-age=${365 * 24 * 60 * 60}`;
          // Reload only if detected locale differs from current page lang
          const currentLang = document.documentElement.lang;
          if (data.suggestedLocale !== currentLang) {
            window.location.reload();
          }
        }
      } catch {
        // Silent fail - tracking should not impact UX
      }
    };

    track();

    const sendTimeSpent = () => {
      if (!visitorIdRef.current) return;
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      navigator.sendBeacon(
        `${API_BASE_URL}/api/track/time`,
        JSON.stringify({ visitorId: visitorIdRef.current, timeSpent })
      );
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendTimeSpent();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      sendTimeSpent();
    };
  }, []);

  return null;
}
