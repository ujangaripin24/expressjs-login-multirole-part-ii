import express from 'express';
import * as marketProductController from '../controller/market-product.controller.js'
import { guardMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/market/product/create', guardMiddleware , marketProductController.createMarketProduct)
router.get('/market/product/get-all', marketProductController.getDataProductStatistics)

export default router