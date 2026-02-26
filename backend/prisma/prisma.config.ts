import { PrismaConfig } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

export const config: PrismaConfig = {
  adapter: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL, // ici tu mets ton URL
  },
};