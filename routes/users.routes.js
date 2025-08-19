import express from 'express';
import * as userControlelr from '../controller/user.controller.js'
const router = express.Router();

/* GET users listing. */
router.get('/users/get-all', userControlelr.GetAllUser);

export default router;
