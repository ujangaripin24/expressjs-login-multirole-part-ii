import db from '../models/index.js'

const { TblMarketProduct, TblMarketData } = db;

export const createMarketProduct = async (data) => {
    const { id_market, name_product, price } = data
    const marketProduct = await TblMarketProduct.create({
        id_market,
        name_product,
        price
    })
    return marketProduct
}

export const getAllMarketProduct = async (id_market) => {
    const market = await TblMarketData.findOne({
        where: { id: id_market }
    })
    if (!market) throw new Error("Market not found");
    const marketProduct = await TblMarketProduct.findAll({
        attributes: ['id', 'name_product', 'price'],
        include: [
            { model: TblMarketData, as: 'market_data_product', attributes: ['id', 'market_name']},
        ],
        where: { id_market }
    })
    return marketProduct
}