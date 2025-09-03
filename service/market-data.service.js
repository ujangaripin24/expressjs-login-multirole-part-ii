import db from '../models/index.js'

const { TblMarketData, TblMstDistricts, TblMstRegencies, TblMstProvince } = db;

export const createMarket = async (data) => {
    const { id_provinces, id_regencies, id_districts, market_name, market_address, latitude, longitude } = data
    const market = await TblMarketData.create({
        id_provinces,
        id_regencies,
        id_districts,
        market_name,
        market_address,
        latitude,
        longitude
    })
    return market
}

export const getAllMarket = async () => {
    return await TblMarketData.findAll({
        attributes: ['id', 'market_name', 'market_address', 'latitude', 'longitude'],
        include: [
            { model: TblMstDistricts, as: 'districts', attributes: ['id', 'name_districts'] },
            { model: TblMstRegencies, as: 'regencies', attributes: ['id', 'name_regencies'] },
            { model: TblMstProvince, as: 'provinces', attributes: ['id', 'name_provinces'] }
        ]
    })
}

export const updateMarket = async (id, data) => {
    const market = await TblMarketData.findOne({
        where: { id }
    })
    if (!market) throw new Error("Market not found");

    await market.update(data, { where: { id: market.id } })
    return market
}