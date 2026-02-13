import { Router } from 'express';
import { getServices, createService, updateService, deleteService } from '../controllers/services.controller';
import { validate } from '../middleware/validate';
import { authMiddleware } from '../middleware/auth';
import { serviceSchema } from '../validators/service.schema';

const router = Router();

/**
 * @openapi
 * /services:
 *   get:
 *     tags: [Services]
 *     summary: Get all services
 *     responses:
 *       200:
 *         description: List of services
 */
router.get('/', getServices);

export const adminServicesRouter = Router();
adminServicesRouter.use(authMiddleware);
adminServicesRouter.post('/', validate(serviceSchema), createService);
adminServicesRouter.put('/:id', validate(serviceSchema), updateService);
adminServicesRouter.delete('/:id', deleteService);

export default router;
