import express from 'express';
import * as marketProductController from '../controller/market-product.controller.js'
import { guardMiddleware } from '../middleware/auth.middleware.js';
import { rateLimiter } from '../middleware/rate-limit.middleware.js';

const router = express.Router()

router.post('/market/product/create', guardMiddleware , marketProductController.createMarketProduct)
router.get('/market/product/get-all', rateLimiter, marketProductController.getDataProductStatistics)

export default router