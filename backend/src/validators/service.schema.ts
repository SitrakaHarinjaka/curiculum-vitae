import { z } from 'zod';

export const serviceSchema = z.object({
  title: z.string().min(2).max(200),
  icon: z.string().min(1).max(100),
  description: z.string().min(10),
  sortOrder: z.number().int().optional(),
});
