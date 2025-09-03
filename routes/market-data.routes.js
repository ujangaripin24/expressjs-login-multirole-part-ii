import express from "express";
import * as marketController from '../controller/market-data.controller.js'
import { createMarketValidator, updateMarketValidator } from "../validator/market.validator.js";
import { validationResult } from "express-validator";
const router = express.Router()

router.post('/market/data/create', createMarketValidator, (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        next()
    }
}, marketController.createMarket)
router.get('/market/data/get-all', marketController.getMarketData)
router.get('/market/data/get-data-by-region', marketController.getAllMarketWithRegion)
router.put('/market/data/update/:id', updateMarketValidator, (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        next()
    }
}, marketController.updateMarket)

export default router;