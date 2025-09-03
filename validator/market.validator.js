import { body } from 'express-validator'
import db from '../models/index.js'
const { TblMarketData } = db

export const createMarketValidator = [
    body('id_provinces').notEmpty().withMessage('id_provinces is required'),
    body('id_regencies').notEmpty().withMessage('id_regencies is required'),
    body('id_districts').notEmpty().withMessage('id_districts is required'),
    body('market_name').notEmpty().withMessage('market_name is required'),
    body('market_address').notEmpty().withMessage('market_address is required'),
    body('latitude').notEmpty().withMessage('latitude is required'),
    body('longitude').notEmpty().withMessage('longitude is required'),
]