import { Router } from 'express';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../controllers/experiences.controller';
import { validate } from '../middleware/validate';
import { authMiddleware } from '../middleware/auth';
import { experienceSchema } from '../validators/experience.schema';

const router = Router();

/**
 * @openapi
 * /experiences:
 *   get:
 *     tags: [Experiences]
 *     summary: Get all work experiences
 *     responses:
 *       200:
 *         description: List of experiences
 */
router.get('/', getExperiences);

export const adminExperiencesRouter = Router();
adminExperiencesRouter.use(authMiddleware);
adminExperiencesRouter.post('/', validate(experienceSchema), createExperience);
adminExperiencesRouter.put('/:id', validate(experienceSchema), updateExperience);
adminExperiencesRouter.delete('/:id', deleteExperience);

export default router;
