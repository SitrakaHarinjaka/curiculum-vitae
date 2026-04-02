export interface Biography {
  id: number;
  fullName: string;
  title: string;
  subtitle: string | null;
  aboutText: string;
  aboutLongText: string;
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

export interface AboutMe {
  id: number;
  description: string;
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

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
  sortOrder: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
