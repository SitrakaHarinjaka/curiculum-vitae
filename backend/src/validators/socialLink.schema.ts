import { z } from 'zod';

export const socialLinkSchema = z.object({
  platform: z.string().min(1).max(50),
  url: z.string().url(),
  icon: z.string().min(1).max(100),
  sortOrder: z.number().int().optional(),
});
