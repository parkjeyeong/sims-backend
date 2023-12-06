import { Router } from 'express';
import portalRoute from './portal/portal.route';
import systemRoute from './system/system.route';

const router = Router();

router.use('/portal', portalRoute);

router.use('/system', systemRoute);

export default router;