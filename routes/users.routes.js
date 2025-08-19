import express from 'express';
import * as userController from '../controller/user.controller.js'
import { createUserValidator, updateUserValidator } from '../validator/users.validator.js';
import { validationResult } from 'express-validator';
const router = express.Router();

/* GET users listing. */
router.get('/users/get-all', userController.GetAllUser);
router.post('/users/create', createUserValidator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next()
    }
}, userController.createUser)
router.put('/users/update/:uuid', updateUserValidator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next()
    }
}, userController.updateUser)

export default router;
