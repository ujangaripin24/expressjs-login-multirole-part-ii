import * as marketProductService from '../service/market-product.service.js'

export const createMarketProduct = async (req, res) => {
    try {
        await marketProductService.createMarketProduct(req.body)
        res.status(201).json({ msg: 'Product Created' })
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}

export const getDataProductStatistics = async (req, res) => {
    try {
        const { province, regencies, districts } = req.query;
        const result = await marketProductService.getProductStatistics({ province, regencies, districts });
        if (!result || result.length === 0) {
            return res.status(200).json({ errors: [{ msg: "tidak ada data" }] });
        }
        res.status(200).json({ status: 200, data: result });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}