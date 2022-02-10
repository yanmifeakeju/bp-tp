import { Router } from 'express';
import handler from './handlers';

const router = Router();

router.route('/').post(handler.create);

export default router;
