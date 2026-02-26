import { Router } from 'express';
import authRoutes from './auth.routes';
import biographyRoutes, { adminBiographyRouter } from './biography.routes';
import skillsRoutes, { adminSkillsRouter } from './skills.routes';
import educationRoutes, { adminEducationRouter } from './education.routes';
import experiencesRoutes, { adminExperiencesRouter } from './experiences.routes';
import servicesRoutes, { adminServicesRouter } from './services.routes';
import contactsRoutes, { adminContactsRouter } from './contacts.routes';
import visitorsRoutes, { adminVisitorsRouter, adminAnalyticsRouter } from './visitors.routes';
import socialLinksRoutes, { adminSocialLinksRouter } from './socialLinks.routes';
import seedRoutes from './seed.routes';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});

// Public routes
router.use('/auth', authRoutes);
router.use('/biography', biographyRoutes);
router.use('/skills', skillsRoutes);
router.use('/education', educationRoutes);
router.use('/experiences', experiencesRoutes);
router.use('/services', servicesRoutes);
router.use('/contacts', contactsRoutes);
router.use('/track', visitorsRoutes);
router.use('/social-links', socialLinksRoutes);
router.use('/seed', seedRoutes);

// Admin routes
router.use('/admin/biography', adminBiographyRouter);
router.use('/admin/skills', adminSkillsRouter);
router.use('/admin/education', adminEducationRouter);
router.use('/admin/experiences', adminExperiencesRouter);
router.use('/admin/services', adminServicesRouter);
router.use('/admin/contacts', adminContactsRouter);
router.use('/admin/visitors', adminVisitorsRouter);
router.use('/admin/analytics', adminAnalyticsRouter);
router.use('/admin/social-links', adminSocialLinksRouter);

export default router;
