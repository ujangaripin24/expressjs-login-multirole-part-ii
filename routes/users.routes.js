import express from 'express';
import * as userController from '../controller/user.controller.js'
import { createUserValidator, updateUserValidator } from '../validator/users.validator.js';
import { validationResult } from 'express-validator';
import { guardMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();

/* GET users listing. */
router.get('/users/get-all', guardMiddleware, userController.GetAllUser);
router.get('/users/detail/:uuid', guardMiddleware, userController.getUserByID);
router.delete('/users/delete/:uuid', guardMiddleware, userController.deleteUser);
router.post('/users/create', createUserValidator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next()
    }
}, userController.createUser)
router.put('/users/update/:uuid', guardMiddleware, updateUserValidator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next()
    }
}, userController.updateUser)

export default router;
