'use client';

import { useEffect } from 'react';
import { API_BASE_URL } from '@/lib/constants';

export function TrackingScript() {
  useEffect(() => {
    const track = async () => {
      try {
        await fetch(`${API_BASE_URL}/api/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referrer: document.referrer || null,
            page: window.location.pathname,
            userAgent: navigator.userAgent,
          }),
        });
      } catch {
        // Silent fail - tracking should not impact UX
      }
    };

    track();
  }, []);

  return null;
}
