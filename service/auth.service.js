import { where } from 'sequelize';
import db from '../models/index.js'
import argon2 from 'argon2'
const { TblUser } = db

export const loginUser = async (email, password) => {
    const user = await TblUser.findOne({ where: { email } });
    if (!user) {
        throw new Error("Email tidak ada");
    }
    const match = await argon2.verify(user.password, password)
    if (!match) {
        throw new Error("Password Salah");

    }

    return user;
}

export const getProfile = async (uuid) => {
    const user = await TblUser.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: { uuid }
    });
    if (!user) {
        throw new Error("User tidak ditemukan");
    }
    return user;
}

export const loginUserJwt = async (email, password) => {
    const user = await TblUser.findOne({ where: { email } })
    if (!user) {
        throw new Error("Email tidak ada")
    }
    const match = await argon2.verify(user.password, password)
    if (!match) {
        throw new Error("Password Salah")
    }
    return user
}

export const getProfileJwt = async (uuid) => {
    const user = await TblUser.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: { uuid }
    })
    if (!user) {
        throw new Error("Uset tidak ditemukan");
    }
}