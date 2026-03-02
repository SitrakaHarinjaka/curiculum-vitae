export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface Biography {
  id: number;
  fullName: string;
  title: string;
  subtitle: string | null;
  aboutText: string;
  profileImage: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  birthday: string | null;
  nationality: string | null;
  languages: string | null;
  freelance: string | null;
  cvUrl: string | null;
}

export interface Skill {
  id: number;
  name: string;
  percentage: number;
  category: string;
  sortOrder: number;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  field: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
  sortOrder: number;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
  technologies: string | null;
  sortOrder: number;
}

export interface Service {
  id: number;
  title: string;
  icon: string;
  description: string;
  sortOrder: number;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Visitor {
  id: number;
  ip: string;
  region: string | null;
  city: string | null;
  country: string | null;
  countryCode: string | null;
  referrer: string | null;
  userAgent: string | null;
  pageVisited: string | null;
  timeSpent: number | null;
  createdAt: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
  sortOrder: number;
}

export interface TranslatableItem {
  id: number;
  label: string;
  fields: Record<string, { fr: string; en: string }>;
}

export interface TranslatableData {
  biography: TranslatableItem[];
  skill: TranslatableItem[];
  education: TranslatableItem[];
  experience: TranslatableItem[];
  service: TranslatableItem[];
}

export interface AnalyticsSummary {
  totalVisits: number;
  uniqueVisitors: number;
  totalMessages: number;
  unreadMessages: number;
}

export interface VisitData {
  date: string;
  count: number;
}

export interface ReferrerData {
  referrer: string;
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
