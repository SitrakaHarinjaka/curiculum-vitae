import { Router } from 'express';
import { getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } from '../controllers/socialLinks.controller';
import { validate } from '../middleware/validate';
import { authMiddleware } from '../middleware/auth';
import { socialLinkSchema } from '../validators/socialLink.schema';

const router = Router();

/**
 * @openapi
 * /social-links:
 *   get:
 *     tags: [Social Links]
 *     summary: Get all social links
 *     responses:
 *       200:
 *         description: List of social links
 */
router.get('/', getSocialLinks);

export const adminSocialLinksRouter = Router();
adminSocialLinksRouter.use(authMiddleware);
adminSocialLinksRouter.post('/', validate(socialLinkSchema), createSocialLink);
adminSocialLinksRouter.put('/:id', validate(socialLinkSchema), updateSocialLink);
adminSocialLinksRouter.delete('/:id', deleteSocialLink);

export default router;
