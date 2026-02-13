import { z } from 'zod';

export const skillSchema = z.object({
  name: z.string().min(1).max(100),
  percentage: z.number().int().min(0).max(100),
  category: z.string().min(1).max(50),
  sortOrder: z.number().int().optional(),
});
