import db from "../models/index.js";
import dotenv from 'dotenv'
import { Op, where } from 'sequelize';
dotenv.config()

const { TblProduct, TblUser } = db;
const DEFAULT_AVATAR = process.env.DEFAULT_AVATAR;

export const getAllProduct = async({page = 1, size = 10, search = ""}) => {
    const limit = parseInt(size)
    const offset = (parseInt(page) - 1) * parseInt(size)

    const where = search ? {
        [Op.or] : [
            { name : { [Op.like] : `%${search}%` } },
        ]
    } : {};

    const {row, count} = await TblProduct.findAndCountAll({
        attributes: ["name", "link_picture", "price"],
        where,
        limit,
        offset,
        order: [["name", "ASC"]]
    });

    const totalPage = Math.ceil(count / limit);

    return{
        data : row,
        size : limit,
        page : parseInt(page),
        totalPage,
        totalData : count
    }
}

export const getProduct = async (role, userId) => {
    if (role === 'admin') {
        return await TblProduct.findAll({
            attributes: ['uuid', 'name', 'link_picture', 'price'],
            include: [{ model: TblUser, attributes: ['name', 'link_picture', 'email'] }]
        })
    }
    return await TblProduct.findAll({
        where: { userId },
        attributes: ['uuid', 'name', 'link_picture', 'price'],
        include: [{ model: TblUser, attributes: ['name', 'link_picture', 'email'] }]
    })
}

export const getProductById = async (uuid, role, userId) => {
    const product = await TblProduct.findOne({ where: { uuid } })
    if (!product) return null

    if (role === 'admin') {
        return await TblProduct.findOne({
            attributes: ['uuid', 'name', 'link_picture', 'price'],
            where: { uuid: product.uuid },
            include: [{ model: TblUser, attributes: ['name', 'link_picture', 'email'] }]
        })
    }

    return await TblProduct.findOne({
        where: { [Op.and]: [{ uuid: product.uuid }, { userId }] },
        attributes: ['uuid', 'name', 'link_picture', 'price'],
        include: [{ model: TblUser, attributes: ['name', 'link_picture', 'email'] }]
    })
}

export const createProduct = async (userId, data) => {
    const { name, link_picture, price } = data
    const product = await TblProduct.create({
        name,
        price,
        link_picture: link_picture || DEFAULT_AVATAR,
        userId
    })
    
    return product
}

export const updateProduct = async (uuid, role, userId, data) => {
    const product = await TblProduct.findOne({
        where: { uuid }
    })
    if (!product) throw new Error("User Tidak ada");

    if (role === 'admin') {
        await product.update(data, { where: { uuid: product.uuid } })
    } else {
        if (userId !== product.userId) throw new Error("Akses terlarang");
        await product.update(data, {
            where: { [Op.and]: [{ uuid: product.uuid }, { userId }] }
        })
    }
    return product
}

export const deleteProduct = async (uuid, role, userId) => {
    const product = await TblProduct.findOne({
        where: { uuid }
    })
    if (!product) throw new Error("User Tidak ada");

    if (role === 'admin') {
        await product.destroy({ where: { uuid: product.uuid } })
    } else {
        if (userId !== product.userId) throw new Error("Akses terlarang")
        await TblProduct.destroy({
            where: { [Op.and]: [{ uuid: product.uuid }, { userId }] }
        })
    }
    return product
}