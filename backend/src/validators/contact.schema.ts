import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Nom minimum 2 caractères').max(100),
  email: z.string().email('Email invalide'),
  subject: z.string().min(2, 'Sujet minimum 2 caractères').max(200),
  message: z.string().min(10, 'Message minimum 10 caractères').max(5000),
});
