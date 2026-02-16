import { API_BASE_URL } from './constants';

export async function fetchApi<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}

export async function postApi<T>(endpoint: string, body: Record<string, unknown>): Promise<{ success: boolean; data?: T; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    return await res.json();
  } catch {
    return { success: false, message: 'Erreur de connexion au serveur' };
  }
}
