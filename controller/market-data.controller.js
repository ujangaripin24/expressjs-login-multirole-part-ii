import * as marketService from '../service/market-data.service.js'

export const getMarketData = async (req, res) => {
    try {
        const { page, size, search } = req.query;

        const result = await marketService.getAllMarket({ page, size, search });

        if (!result.data || result.data.length === 0) {
            return res.status(200).json({ errors: [{ msg: "tidak ada data" }] });
        }

        res.status(200).json({
            status: 200,
            data: result.data,
            size: result.size,
            page: result.page,
            totalPage: result.totalPage,
            totalData: result.totalData
        });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
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

export const getAllMarketWithRegion = async (req, res) => {
    try {
        const { province, regencies, districts, page, size } = req.query;

        const result = await marketService.getAllMarketWithRegionData({
            province,
            regencies,
            districts,
            page,
            size
        });

        if (!result.data || result.data.length === 0) {
            return res.status(200).json({ errors: [{ msg: "tidak ada data" }] });
        }

        res.status(200).json({
            status: 200,
            data: result.data,
            size: result.size,
            page: result.page,
            totalPage: result.totalPage,
            totalData: result.totalData
        });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
};

export const getMarketDataByID = async (req, res) => {
    try {
        const market = await marketService.getDataMarketByID(req.params.id)
        res.status(200).json(market)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}