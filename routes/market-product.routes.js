import express from 'express';
import * as marketProductController from '../controller/market-product.controller.js'

const router = express.Router()

router.post('/market/product/create', marketProductController.createMarketProduct)

export default router