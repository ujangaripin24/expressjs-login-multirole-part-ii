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
        await marketService.createMarket(req.body)
        res.status(201).json({ msg: 'Product Created' })
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}

export const updateMarket = async (req, res) => {
    try {
        const updated = await marketService.updateMarket(req.params.id, req.body)
        if (!updated) return res.status(404).json({ errors: [{ msg: 'Market not found' }] })
        res.status(200).json({ msg: 'Market Updated' })
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}