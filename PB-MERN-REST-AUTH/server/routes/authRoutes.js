import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';

router.post('/login', authController.login);
router.post('/assign-role', authController.addRole);
router.post('/remove-role', authController.removeRole);
router.get('/roles', authController.getAvailableRoles);
router.get('/user-roles/:userId', authController.getRolesForUser);

export default router;