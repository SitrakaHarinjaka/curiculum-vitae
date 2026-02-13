import { z } from 'zod';

export const educationSchema = z.object({
  school: z.string().min(2).max(200),
  degree: z.string().min(2).max(200),
  field: z.string().max(200).optional().nullable(),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
});
