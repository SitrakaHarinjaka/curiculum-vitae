import { Router } from 'express';
import { getBiography, upsertBiography } from '../controllers/biography.controller';
import { validate } from '../middleware/validate';
import { authMiddleware } from '../middleware/auth';
import { biographySchema } from '../validators/biography.schema';

const router = Router();

/**
 * @openapi
 * /biography:
 *   get:
 *     tags: [Biography]
 *     summary: Get biography
 *     responses:
 *       200:
 *         description: Biography data
 */
router.get('/', getBiography);

/**
 * @openapi
 * /admin/biography:
 *   put:
 *     tags: [Admin - Biography]
 *     summary: Create or update biography
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, title, aboutText]
 *             properties:
 *               fullName: { type: string }
 *               title: { type: string }
 *               aboutText: { type: string }
 *               profileImage: { type: string }
 *               phone: { type: string }
 *               email: { type: string }
 *               address: { type: string }
 *     responses:
 *       200:
 *         description: Biography updated
 */

export const adminBiographyRouter = Router();
adminBiographyRouter.put('/', authMiddleware, validate(biographySchema), upsertBiography);

export default router;
