import * as marketProductService from '../service/market-product.service.js'

export const createMarketProduct = async (req, res) => {
    try {
        await marketProductService.createMarketProduct(req.body)
        res.status(201).json({ msg: 'Product Created' })
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}

export const getAllMarketProduct = async (req, res) => {
    try {
        const marketProduct = await marketProductService.getAllMarketProduct(req.params.id_market)
        res.status(200).json(marketProduct)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}