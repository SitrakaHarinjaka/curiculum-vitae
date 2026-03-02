import { prisma } from '../config/prisma';

export async function getVisitsOverTime(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const visits = await prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
    SELECT DATE(created_at) as date, COUNT(*)::bigint as count
    FROM visitors
    WHERE created_at >= ${startDate}
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `;

  return visits.map((v: { date: string; count: bigint }) => ({
    date: v.date,
    count: Number(v.count),
  }));
}

export async function getTopReferrers(limit: number = 10) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const referrers = await prisma.$queryRaw<Array<{ referrer: string; count: bigint }>>`
    SELECT COALESCE(referrer, 'Direct') as referrer, COUNT(*)::bigint as count
    FROM visitors
    WHERE created_at >= ${thirtyDaysAgo}
    GROUP BY referrer
    ORDER BY count DESC
    LIMIT ${limit}
  `;

  return referrers.map((r: { referrer: string; count: bigint }) => ({
    referrer: r.referrer,
    count: Number(r.count),
  }));
}

export async function getSummaryStats() {
  const [totalVisits, uniqueVisitors, totalMessages, unreadMessages] = await Promise.all([
    prisma.visitor.count(),
    prisma.visitor.groupBy({ by: ['ip'], _count: true }).then((r: unknown[]) => r.length),
    prisma.contact.count(),
    prisma.contact.count({ where: { isRead: false } }),
  ]);

  return {
    totalVisits,
    uniqueVisitors,
    totalMessages,
    unreadMessages,
  };
}
