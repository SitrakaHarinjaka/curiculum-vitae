import { z } from 'zod';

export const experienceSchema = z.object({
  company: z.string().min(2).max(200),
  role: z.string().min(2).max(200),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  technologies: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
});
