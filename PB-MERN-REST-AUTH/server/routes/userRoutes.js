import express from 'express';
const router = express.Router();

import userController from '../controllers/userController.js';


router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/register', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


export default router;