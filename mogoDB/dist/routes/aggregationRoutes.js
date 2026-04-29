import { Router } from 'express';
import * as aggregationController from '../controllers/aggregationController.js';
const router = Router();
router.get('/stats/users', aggregationController.getUserStats);
router.get('/stats/orders', aggregationController.getOrderStats);
export default router;
//# sourceMappingURL=aggregationRoutes.js.map