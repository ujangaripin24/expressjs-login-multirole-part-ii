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

export const getProductStatistics = async ({ province, regencies, districts }) => {
  const where = {};
  if (province) where.id_provinces = province;
  if (regencies) where.id_regencies = regencies;
  if (districts) where.id_districts = districts;

  const stats = await TblMarketProduct.findAll({
    attributes: [
      'name_product',
      [db.sequelize.fn('AVG', db.sequelize.col('price')), 'avg_price']
    ],
    include: [
      {
        model: TblMarketData,
        as: 'market_data_product',
        attributes: [],
        where
      }
    ],
    group: ['name_product'],
    order: [[db.sequelize.literal('avg_price'), 'DESC']],
    limit: 10
  });

  return stats;
};
