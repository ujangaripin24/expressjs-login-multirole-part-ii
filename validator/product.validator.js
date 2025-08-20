import { body, param } from 'express-validator'
import db from '../models/index.js'
const { TblUser } = db

export const createUserValidator = [
    body('name').notEmpty().withMessage('name is required'),
    body('price').notEmpty().withMessage('price is required'),
    body('link_picture').notEmpty().withMessage('link_picture is required'),
]

export const updateUserValidator = [
    param('uuid')
        .notEmpty().withMessage('uuid is required')
        .custom(async (value) => {
            const user = await TblUser.findOne({ where: { uuid: value } })
            if (!user) {
                throw new Error('tidak ada id tersebut')
            }
            return true
        }),
    body('name')
        .notEmpty().withMessage('Username wajib diisi'),
    body('price')
        .notEmpty().withMessage('Harga wajib diisi'),
    body('link_picture')
        .notEmpty().withMessage('Gambar wajib diisi')

]