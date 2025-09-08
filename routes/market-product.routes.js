import express from 'express';
import * as marketProductController from '../controller/market-product.controller.js'

const router = express.Router()

router.post('/market/product/create', marketProductController.createMarketProduct)
router.get('/market/product/get-all/:id_market', marketProductController.getAllMarketProduct)

export default router