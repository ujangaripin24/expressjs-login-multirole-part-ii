import argon2 from 'argon2'
import db from '../models/index.js'
const {TblUser} = db;

export const GetAllUser = async () => {
    return await TblUser.findAll(
        { attributes: ['name', 'email', 'link_picture'] }
    );
}