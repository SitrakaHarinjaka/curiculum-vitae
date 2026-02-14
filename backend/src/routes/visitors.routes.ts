import { Router } from 'express';
import { trackVisitor, getVisitors, deleteVisitor, getAnalyticsVisits, getAnalyticsReferrers, getAnalyticsSummary } from '../controllers/visitors.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

/**
 * @openapi
 * /track:
 *   post:
 *     tags: [Tracking]
 *     summary: Track a visitor
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               referrer: { type: string }
 *               page: { type: string }
 *               userAgent: { type: string }
 *     responses:
 *       201:
 *         description: Visit tracked
 */
router.post('/', trackVisitor);

export const adminVisitorsRouter = Router();
adminVisitorsRouter.use(authMiddleware);
adminVisitorsRouter.get('/', getVisitors);
adminVisitorsRouter.delete('/:id', deleteVisitor);

export const adminAnalyticsRouter = Router();
adminAnalyticsRouter.use(authMiddleware);

/**
 * @openapi
 * /admin/analytics/visits:
 *   get:
 *     tags: [Admin - Analytics]
 *     summary: Get visits over time
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema: { type: integer, default: 30 }
 *     responses:
 *       200:
 *         description: Visit data
 */
adminAnalyticsRouter.get('/visits', getAnalyticsVisits);

/**
 * @openapi
 * /admin/analytics/referrers:
 *   get:
 *     tags: [Admin - Analytics]
 *     summary: Get top referrers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Referrer data
 */
adminAnalyticsRouter.get('/referrers', getAnalyticsReferrers);

/**
 * @openapi
 * /admin/analytics/summary:
 *   get:
 *     tags: [Admin - Analytics]
 *     summary: Get summary statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary stats
 */
adminAnalyticsRouter.get('/summary', getAnalyticsSummary);

export default router;
