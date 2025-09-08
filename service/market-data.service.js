import { Op } from 'sequelize';
import db from '../models/index.js'

const { TblMarketData, TblMstDistricts, TblMstRegencies, TblMstProvince, TblMarketProduct } = db;

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

export const getAllMarket = async ({ page = 1, size = 10, search = "" }) => {
    const limit = parseInt(size)
    const offset = (parseInt(page) - 1) * parseInt(size)

    const where = search ? {
        [Op.or]: [
            { market_name: { [Op.like]: `%${search}%` } },
            { market_address: { [Op.like]: `%${search}%` } }
        ]
    } : {};

    const { rows, count } = await TblMarketData.findAndCountAll({
        attributes: ['id', 'market_name', 'market_address', 'latitude', 'longitude'],
        include: [
            { model: TblMarketProduct, as: 'market_data_product', attributes: ['name_product', 'price'] },
            { model: TblMstDistricts, as: 'districts', attributes: ['id', 'name_districts'] },
            { model: TblMstRegencies, as: 'regencies', attributes: ['id', 'name_regencies'] },
            { model: TblMstProvince, as: 'provinces', attributes: ['id', 'name_provinces'] }
        ],
        where,
        limit,
        offset,
        order: [["market_name", "ASC"]]
    })

    const totalPage = Math.ceil(count / limit);

    return {
        data: rows,
        size: limit,
        page: parseInt(page),
        totalPage,
        totalData: count
    }
}

export const updateMarket = async (id, data) => {
    const market = await TblMarketData.findOne({
        where: { id }
    })
    if (!market) throw new Error("Market not found");

    await market.update(data, { where: { id: market.id } })
    return market
}

export const getAllMarketWithRegionData = async ({ province, regencies, districts, page = 1, size = 10 }) => {
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * parseInt(size);

    const where = {};
    if (province) {
        where.id_provinces = province;
    }
    if (regencies) {
        where.id_regencies = regencies;
    }
    if (districts) {
        where.id_districts = districts;
    }

    const { rows, count } = await TblMarketData.findAndCountAll({
        attributes: ["id", "market_name", "market_address", "latitude", "longitude"],
        include: [
            { model: TblMstDistricts, as: "districts", attributes: ["id", "name_districts"] },
            { model: TblMstRegencies, as: "regencies", attributes: ["id", "name_regencies"] },
            { model: TblMstProvince, as: "provinces", attributes: ["id", "name_provinces"] }
        ],
        where,
        limit,
        offset,
        order: [["market_name", "ASC"]]
    });

    const totalPage = Math.ceil(count / limit);

    return {
        data: rows,
        size: limit,
        page: parseInt(page),
        totalPage,
        totalData: count
    };
};

export const getDataMarketByID = async (id) => {
    const market = await TblMarketData.findOne({
        where: { id },
        attributes: ['id', 'market_name', 'market_address', 'latitude', 'longitude'],
        include: [
            { model: TblMarketProduct, as: 'market_data_product', attributes: ['name_product', 'price'] },
            { model: TblMstDistricts, as: 'districts', attributes: ['id', 'name_districts'] },
            { model: TblMstRegencies, as: 'regencies', attributes: ['id', 'name_regencies'] },
            { model: TblMstProvince, as: 'provinces', attributes: ['id', 'name_provinces'] }
        ],
    })
    if (!market) throw new Error("Market not found");
    return market
}

export const deleteMarket = async (id) => {
    const market = await TblMarketData.findOne({
        where: { id }
    })
    if (!market) throw new Error("Market not found");

    await market.destroy({ where: { id: market.id } })
    return market
}