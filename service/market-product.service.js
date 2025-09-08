import db from '../models/index.js'

const {TblMarketProduct} = db;

export const createMarketProduct = async(data) => {
    const {id_market, name_product, price} = data
    const marketProduct = await TblMarketProduct.create({
        id_market,
        name_product,
        price
    })
    return marketProduct
}