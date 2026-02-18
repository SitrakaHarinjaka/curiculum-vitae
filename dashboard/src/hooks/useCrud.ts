import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';

export function useCrud<T extends { id: number }>(endpoint: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/${endpoint}`);
      setItems(res.data.data || []);
    } catch (err) {
      // Try public endpoint as fallback
      try {
        const res = await api.get(`/${endpoint}`);
        setItems(res.data.data || []);
      } catch {
        console.error(`Failed to fetch ${endpoint}:`, err);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const create = async (data: Partial<T>) => {
    const res = await api.post(`/admin/${endpoint}`, data);
    await fetchAll();
    return res.data.data;
  };

  const update = async (id: number, data: Partial<T>) => {
    const res = await api.put(`/admin/${endpoint}/${id}`, data);
    await fetchAll();
    return res.data.data;
  };

  const remove = async (id: number) => {
    await api.delete(`/admin/${endpoint}/${id}`);
    await fetchAll();
  };

  return { items, loading, create, update, remove, refetch: fetchAll };
}
