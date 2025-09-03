import * as marketService from '../service/market-data.service.js'

export const getMarketData = async (req, res) => {
    try {
        const market = await marketService.getAllMarket()
        if (!market || market.length === 0) {
            return res.status(404).json({ errors: [{ msg: 'Market data not found' }] })
        }

        res.status(200).json({
            status: 200,
            data: market,
        })
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}

export const createMarket = async (req, res) => {
    try {
        const { id_provinces, id_regencies, id_districts, market_name, market_address, latitude, longitude } = req.body
        await marketService.createMarket({ id_provinces, id_regencies, id_districts, market_name, market_address, latitude, longitude })
        res.status(201).json({ msg: 'Product Created' })
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}