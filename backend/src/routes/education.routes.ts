import { Router } from 'express';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../controllers/education.controller';
import { validate } from '../middleware/validate';
import { authMiddleware } from '../middleware/auth';
import { educationSchema } from '../validators/education.schema';

const router = Router();

/**
 * @openapi
 * /education:
 *   get:
 *     tags: [Education]
 *     summary: Get all education entries
 *     responses:
 *       200:
 *         description: List of education entries
 */
router.get('/', getEducation);

export const adminEducationRouter = Router();
adminEducationRouter.use(authMiddleware);
adminEducationRouter.post('/', validate(educationSchema), createEducation);
adminEducationRouter.put('/:id', validate(educationSchema), updateEducation);
adminEducationRouter.delete('/:id', deleteEducation);

export default router;
