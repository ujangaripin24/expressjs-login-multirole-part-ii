import argon2 from 'argon2'
import db from '../models/index.js'
import dotenv from 'dotenv'
dotenv.config()
const { TblUser } = db;

const DEFAULT_AVATAR = process.env.DEFAULT_AVATAR;

export const GetAllUser = async () => {
    return await TblUser.findAll(
        { attributes: ['name', 'email', 'link_picture'] }
    );
}

export const getUserByID = async (uuid) => {
    const user = await TblUser.findOne({where: {uuid}})
    if (!user) {
        throw new Error("User Tidak ada");
    }
    return user;
}

export const createUser = async (data) => {
    const { name, email, password, link_picture, role, type } = data;
    const hashedPassword = await argon2.hash(password);
    const user = await TblUser.create({
        name,
        email,
        password: hashedPassword,
        link_picture: link_picture || DEFAULT_AVATAR,
        role,
        type
    });
    return user;
}

export const updateUser = async(uuid, payload) => {
    const user = await TblUser.findOne({where: {uuid}})
    if (!user) {
        throw new Error("User Tidak ada");
    }

    const { name, email, password, link_picture, role, type } = payload;

    user.name = name;
    user.email = email;
    user.role = role || user.role;
    user.type = type || user.type;
    user.link_picture = link_picture || user.link_picture;

    if (password) {
        user.password = await argon2.hash(password);
    }

    await user.save();
    return user;
}

export const deleteUser = async(uuid) => {
    const user = await TblUser.findOne({where: {uuid}})
    if (!user) {
        throw new Error("User Tidak ada");
    }

    await user.destroy();
    return user;
}
