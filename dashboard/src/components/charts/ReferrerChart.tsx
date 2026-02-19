import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ReferrerData } from '../../lib/types';

interface ReferrerChartProps {
  data: ReferrerData[];
}

const COLORS = ['#06b6d4', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#3b82f6', '#14b8a6', '#f97316', '#6366f1'];

export function ReferrerChart({ data }: ReferrerChartProps) {
  const formatted = data.map(d => ({
    ...d,
    name: d.referrer.length > 30 ? d.referrer.substring(0, 30) + '...' : d.referrer,
  }));

  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>Top Referrers</h3>
      <div className="h-72">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formatted}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                strokeWidth={0}
              >
                {formatted.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--chart-tooltip-bg)',
                  border: '1px solid var(--chart-tooltip-border)',
                  borderRadius: 8,
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-lg)',
                }}
                formatter={(value: number) => [`${value} visites`, '']}
              />
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center" style={{ color: 'var(--text-secondary)' }}>
            Aucune donnée de referrer
          </div>
        )}
      </div>
    </div>
  );
}
