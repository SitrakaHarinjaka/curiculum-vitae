import { useState, useEffect } from 'react';
import api from '../lib/api';
import { AnalyticsSummary, VisitData, ReferrerData, Visitor, Contact } from '../lib/types';
import { StatsCards } from '../components/charts/StatsCards';
import { VisitChart } from '../components/charts/VisitChart';
import { ReferrerChart } from '../components/charts/ReferrerChart';
import { DataTable } from '../components/ui/DataTable';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Mail, MailOpen } from 'lucide-react';

export function Dashboard() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [referrers, setReferrers] = useState<ReferrerData[]>([]);
  const [recentVisitors, setRecentVisitors] = useState<Visitor[]>([]);
  const [recentMessages, setRecentMessages] = useState<Contact[]>([]);

  useEffect(() => {
    Promise.all([
      api.get('/admin/analytics/summary'),
      api.get('/admin/analytics/visits'),
      api.get('/admin/analytics/referrers'),
      api.get('/admin/visitors?limit=10'),
      api.get('/admin/contacts?limit=5'),
    ]).then(([summaryRes, visitsRes, referrersRes, visitorsRes, messagesRes]) => {
      setSummary(summaryRes.data.data);
      setVisits(visitsRes.data.data);
      setReferrers(referrersRes.data.data);
      setRecentVisitors(visitorsRes.data.data);
      setRecentMessages(messagesRes.data.data);
    }).catch(console.error);
  }, []);

  const visitorColumns = [
    { key: 'ip', header: 'Adresse IP' },
    {
      key: 'location',
      header: 'Localisation',
      render: (v: Visitor) => [v.city, v.country].filter(Boolean).join(', ') || '-',
    },
    { key: 'referrer', header: 'Referrer', render: (v: Visitor) => v.referrer || 'Direct' },
    {
      key: 'createdAt',
      header: 'Date',
      render: (v: Visitor) => format(new Date(v.createdAt), 'dd MMM yyyy HH:mm', { locale: fr }),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>Dashboard</h1>

      {/* Stats cards */}
      <StatsCards summary={summary} />

      {/* Visites + Top Referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitChart data={visits} />
        <ReferrerChart data={referrers} />
      </div>

      {/* Messages récents + Derniers visiteurs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages récents */}
        <div className="rounded-xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
          <div className="p-5 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-heading)' }}>Messages récents</h3>
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}>
              {summary?.unreadMessages ?? 0} non lu{(summary?.unreadMessages ?? 0) > 1 ? 's' : ''}
            </span>
          </div>
          <div>
            {recentMessages.length === 0 ? (
              <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>Aucun message</div>
            ) : (
              recentMessages.map(msg => (
                <div key={msg.id} className="flex items-start gap-3 p-4 transition-colors hover:opacity-90" style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <div className="mt-0.5 shrink-0" style={{ color: msg.isRead ? 'var(--text-secondary)' : 'var(--accent)' }}>
                    {msg.isRead ? <MailOpen size={16} /> : <Mail size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium truncate" style={{ color: msg.isRead ? 'var(--text-secondary)' : 'var(--text-heading)' }}>
                        {msg.name}
                      </span>
                      <span className="text-xs shrink-0" style={{ color: 'var(--text-secondary)' }}>
                        {format(new Date(msg.createdAt), 'dd MMM', { locale: fr })}
                      </span>
                    </div>
                    <p className="text-sm truncate mt-0.5" style={{ color: msg.isRead ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                      {msg.subject}
                    </p>
                    <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>{msg.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Derniers visiteurs */}
        <div className="rounded-xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
          <div className="p-5" style={{ borderBottom: '1px solid var(--border)' }}>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-heading)' }}>Derniers visiteurs</h3>
          </div>
          <DataTable
            columns={visitorColumns}
            data={recentVisitors}
            keyExtractor={(v) => v.id}
          />
        </div>
      </div>
    </div>
  );
}
