import { Router } from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill, reorderSkills } from '../controllers/skills.controller';
import { validate } from '../middleware/validate';
import { authMiddleware } from '../middleware/auth';
import { skillSchema } from '../validators/skill.schema';

const router = Router();

/**
 * @openapi
 * /skills:
 *   get:
 *     tags: [Skills]
 *     summary: Get all skills
 *     responses:
 *       200:
 *         description: List of skills
 */
router.get('/', getSkills);

/**
 * @openapi
 * /admin/skills:
 *   post:
 *     tags: [Admin - Skills]
 *     summary: Create a skill
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, percentage, category]
 *             properties:
 *               name: { type: string }
 *               percentage: { type: integer, minimum: 0, maximum: 100 }
 *               category: { type: string }
 *               sortOrder: { type: integer }
 *     responses:
 *       201:
 *         description: Skill created
 */

export const adminSkillsRouter = Router();
adminSkillsRouter.use(authMiddleware);
adminSkillsRouter.post('/', validate(skillSchema), createSkill);
adminSkillsRouter.put('/reorder', reorderSkills);
adminSkillsRouter.put('/:id', validate(skillSchema), updateSkill);
adminSkillsRouter.delete('/:id', deleteSkill);

export default router;
