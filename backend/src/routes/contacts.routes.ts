import { Router } from 'express';
import { submitContact, getContacts, markAsRead, deleteContact, getUnreadCount } from '../controllers/contacts.controller';
import { validate } from '../middleware/validate';
import { authMiddleware } from '../middleware/auth';
import { contactLimiter } from '../middleware/rateLimiter';
import { contactSchema } from '../validators/contact.schema';

const router = Router();

/**
 * @openapi
 * /contacts:
 *   post:
 *     tags: [Contact]
 *     summary: Submit contact form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, subject, message]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               subject: { type: string }
 *               message: { type: string }
 *     responses:
 *       201:
 *         description: Message sent
 */
router.post('/', contactLimiter, validate(contactSchema), submitContact);

export const adminContactsRouter = Router();
adminContactsRouter.use(authMiddleware);
adminContactsRouter.get('/', getContacts);
adminContactsRouter.get('/unread-count', getUnreadCount);
adminContactsRouter.put('/:id/read', markAsRead);
adminContactsRouter.delete('/:id', deleteContact);

export default router;
