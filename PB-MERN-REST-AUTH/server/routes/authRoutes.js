import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';

router.post('/login', authController.login);
router.post('/assign-role', authController.addRole);
router.post('/remove-role', authController.removeRole);

export default router;