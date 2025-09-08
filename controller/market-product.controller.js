import * as marketProductService from '../service/market-product.service.js'

export const createMarketProduct = async (req, res) => {
    try {
        await marketProductService.createMarketProduct(req.body)
        res.status(201).json({ msg: 'Product Created' })
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}