import { Router } from 'express';
import { getTranslationsByEntity, getAllTranslatable, upsertTranslations } from '../controllers/translations.controller';
import { authMiddleware } from '../middleware/auth';

export const adminTranslationsRouter = Router();
adminTranslationsRouter.use(authMiddleware);
adminTranslationsRouter.get('/', getTranslationsByEntity);
adminTranslationsRouter.get('/all', getAllTranslatable);
adminTranslationsRouter.put('/', upsertTranslations);
