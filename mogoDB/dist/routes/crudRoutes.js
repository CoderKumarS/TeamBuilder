import { Router } from 'express';
import * as crudController from '../controllers/crudController.js';
const router = Router();
router.post('/users', crudController.createUser);
router.get('/users', crudController.getUsers);
router.get('/users/:id', crudController.getUserById);
router.put('/users/:id', crudController.updateUser);
router.delete('/users/:id', crudController.deleteUser);
export default router;
//# sourceMappingURL=crudRoutes.js.map