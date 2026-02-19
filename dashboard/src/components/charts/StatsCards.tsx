import { Eye, Users, Mail, MailOpen, TrendingUp } from 'lucide-react';
import { AnalyticsSummary } from '../../lib/types';

interface StatsCardsProps {
  summary: AnalyticsSummary | null;
}

export function StatsCards({ summary }: StatsCardsProps) {
  const cards = [
    {
      label: 'Visites totales',
      value: summary?.totalVisits ?? 0,
      icon: Eye,
      iconBg: '#3b82f6',
      iconColor: '#ffffff',
      accent: '#3b82f6',
    },
    {
      label: 'Visiteurs uniques',
      value: summary?.uniqueVisitors ?? 0,
      icon: Users,
      iconBg: '#10b981',
      iconColor: '#ffffff',
      accent: '#10b981',
    },
    {
      label: 'Messages reçus',
      value: summary?.totalMessages ?? 0,
      icon: Mail,
      iconBg: '#8b5cf6',
      iconColor: '#ffffff',
      accent: '#8b5cf6',
    },
    {
      label: 'Non lus',
      value: summary?.unreadMessages ?? 0,
      icon: MailOpen,
      iconBg: '#ef4444',
      iconColor: '#ffffff',
      accent: '#ef4444',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(card => (
        <div
          key={card.label}
          className="rounded-xl p-5 transition-all hover:translate-y-[-2px]"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: card.iconBg }}
            >
              <card.icon size={20} color={card.iconColor} />
            </div>
            <TrendingUp size={16} style={{ color: card.accent }} />
          </div>
          <p className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>
            {card.value.toLocaleString()}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {card.label}
          </p>
        </div>
      ))}
    </div>
  );
}
