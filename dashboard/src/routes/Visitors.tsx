import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Visitor } from '../lib/types';
import { DataTable } from '../components/ui/DataTable';
import { Pagination } from '../components/ui/Pagination';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';

export function Visitors() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVisitors = (p = page) => {
    setLoading(true);
    api.get(`/admin/visitors?page=${p}&limit=20`)
      .then(res => {
        const filtered = res.data.data.filter((v: Visitor) => !v.isBot);
        setVisitors(filtered);
        setTotalPages(res.data.meta?.totalPages || 1);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchVisitors(page); }, [page]);
  useEffect(()=> {console.log('visitors => ', visitors)}, [visitors]);
  const deleteVisitor = async (id: number) => {
    if (!confirm('Supprimer ce visiteur ?')) return;
    await api.delete(`/admin/visitors/${id}`);
    fetchVisitors(page);
  };

  const columns = [
    { key: 'ip', header: 'Adresse IP' },
    { key: 'city', header: 'Ville', render: (v: Visitor) => v.city || '-' },
    { key: 'region', header: 'Région', render: (v: Visitor) => v.region || '-' },
    { key: 'country', header: 'Pays', render: (v: Visitor) => v.country || '-' },
    { key: 'referrer', header: 'Referrer', render: (v: Visitor) => (
      <span className="max-w-[200px] block truncate" title={v.referrer || 'Direct'}>
        {v.referrer || 'Direct'}
      </span>
    )},
    { key: 'pageVisited', header: 'Page', render: (v: Visitor) => v.pageVisited || '/' },
    {
      key: 'createdAt',
      header: 'Date & Heure',
      render: (v: Visitor) => format(new Date(v.createdAt), 'dd MMM yyyy HH:mm:ss', { locale: fr }),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (v: Visitor) => (
        <button
          onClick={() => deleteVisitor(v.id)}
          className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10 text-red-400 hover:text-red-300"
          title="Supprimer"
        >
          <Trash2 size={14} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>Visiteurs</h1>

      <div className="rounded-xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
        <DataTable
          columns={columns}
          data={visitors}
          loading={loading}
          keyExtractor={(v) => v.id}
        />

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
