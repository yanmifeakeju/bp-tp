import { Router } from 'express';
import handler from './handlers';
import validatePayload from './middleware/create';

const router = Router();
router.route('/').post(validatePayload, handler.create);

export default router;
