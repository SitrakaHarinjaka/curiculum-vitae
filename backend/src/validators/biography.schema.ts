import { z } from 'zod';

export const biographySchema = z.object({
  fullName: z.string().min(2).max(100),
  title: z.string().min(2).max(200),
  subtitle: z.string().max(200).optional().nullable(),
  aboutText: z.string().min(10),
  profileImage: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  address: z.string().optional().nullable(),
  birthday: z.string().optional().nullable(),
  nationality: z.string().optional().nullable(),
  languages: z.string().optional().nullable(),
  freelance: z.string().optional().nullable(),
  cvUrl: z.string().url().optional().nullable(),
});
