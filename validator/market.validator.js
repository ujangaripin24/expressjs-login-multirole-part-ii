import { body, param } from 'express-validator'
import db from '../models/index.js'
const { TblMstProvince, TblMstRegencies, TblMstDistricts } = db

export const createMarketValidator = [
    body('id_provinces')
        .notEmpty().withMessage('id_provinces is required')
        .custom(async (value) => {
            const province = await TblMstProvince.findByPk(value)
            if (!province) {
                throw new Error('Province not found')
            }
            return true
        }),

    body('id_regencies')
        .notEmpty().withMessage('id_regencies is required')
        .custom(async (value, { req }) => {
            const regency = await TblMstRegencies.findByPk(value)
            if (!regency) {
                throw new Error('Regency not found')
            }
            if (regency.id_provinces !== parseInt(req.body.id_provinces)) {
                throw new Error('Regency does not belong to selected province')
            }
            return true
        }),

    body('id_districts')
        .notEmpty().withMessage('id_districts is required')
        .custom(async (value, { req }) => {
            const district = await TblMstDistricts.findByPk(value)
            if (!district) {
                throw new Error('District not found')
            }
            if (district.id_regencies !== parseInt(req.body.id_regencies)) {
                throw new Error('District does not belong to selected regency')
            }
            return true
        }),
    body('market_name').notEmpty().withMessage('market_name is required'),
    body('market_address').notEmpty().withMessage('market_address is required'),
    body('latitude').notEmpty().withMessage('latitude is required'),
    body('longitude').notEmpty().withMessage('longitude is required'),
]

export const updateMarketValidator = [
    param('id')
        .notEmpty().withMessage("id is required")
        .custom(async (value) => {
            const user = await TblMarketData.findOne({ where: { id: value } });
            if (!user) {
                throw new Error("tidak ada id tersebut");
            }
            return true;
        }),
    body('id_provinces')
        .notEmpty().withMessage('id_provinces is required')
        .custom(async (value) => {
            const province = await TblMstProvince.findByPk(value)
            if (!province) {
                throw new Error('Province not found')
            }
            return true
        }),

    body('id_regencies')
        .notEmpty().withMessage('id_regencies is required')
        .custom(async (value, { req }) => {
            const regency = await TblMstRegencies.findByPk(value)
            if (!regency) {
                throw new Error('Regency not found')
            }
            if (regency.id_provinces !== parseInt(req.body.id_provinces)) {
                throw new Error('Regency does not belong to selected province')
            }
            return true
        }),

    body('id_districts')
        .notEmpty().withMessage('id_districts is required')
        .custom(async (value, { req }) => {
            const district = await TblMstDistricts.findByPk(value)
            if (!district) {
                throw new Error('District not found')
            }
            if (district.id_regencies !== parseInt(req.body.id_regencies)) {
                throw new Error('District does not belong to selected regency')
            }
            return true
        }),
    body('market_name').notEmpty().withMessage('market_name is required'),
    body('market_address').notEmpty().withMessage('market_address is required'),
    body('latitude').notEmpty().withMessage('latitude is required'),
    body('longitude').notEmpty().withMessage('longitude is required'),
]