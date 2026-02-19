import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { VisitData } from '../../lib/types';

interface VisitChartProps {
  data: VisitData[];
}

export function VisitChart({ data }: VisitChartProps) {
  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-heading)' }}>Visites (30 derniers jours)</h3>
      </div>
      <div className="h-72">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis
                dataKey="date"
                stroke="var(--chart-text)"
                fontSize={12}
                tickFormatter={(val: string) => {
                  const d = new Date(val);
                  return `${d.getDate()}/${d.getMonth() + 1}`;
                }}
              />
              <YAxis stroke="var(--chart-text)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--chart-tooltip-bg)',
                  border: '1px solid var(--chart-tooltip-border)',
                  borderRadius: 8,
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-lg)',
                }}
                labelStyle={{ color: 'var(--text-secondary)' }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#visitGradient)"
                name="Visites"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center" style={{ color: 'var(--text-secondary)' }}>
            Aucune donnée de visite pour le moment
          </div>
        )}
      </div>
    </div>
  );
}
