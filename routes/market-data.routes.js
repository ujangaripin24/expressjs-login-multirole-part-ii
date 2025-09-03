import express from "express";
import * as marketController from '../controller/market-data.controller.js'
import { createMarketValidator } from "../validator/market.validator.js";

const router = express.Router()

router.post('/market/create',
    createMarketValidator, marketController.createMarket
)
router.get('/market/get-all', marketController.getMarketData)

export default router;