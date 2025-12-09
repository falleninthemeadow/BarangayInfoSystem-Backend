import { Router } from 'express';

import barangaySecretaryRoutes from './barangay-secretaries.routes';
import authRoutes from './auth.routes';
import servicesRoutes from './services.routes';
import residentsRoutes from './residents.routes';

const router = Router();

router.use('/barangay_secretaries', barangaySecretaryRoutes);
router.use('/auth', authRoutes);
router.use('/services', servicesRoutes);
router.use('/residents', residentsRoutes);

export default router;