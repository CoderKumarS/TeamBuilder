import { Router } from 'express';
import * as pipelineController from '../controllers/pipelineController.js';
const router = Router();
router.get('/pipelines/user-orders', pipelineController.getUserOrders);
router.get('/pipelines/unwound-orders', pipelineController.getUnwoundOrders);
export default router;
//# sourceMappingURL=pipelineRoutes.js.map