import db from '../models/index.js'
const { TblUser } = db

export const guardMiddleware = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ errors: [{ msg: "Mohon login kembali Bang" }] });
    }
    const user = await TblUser.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ errors: [{ msg: "User tidak ditemukan" }] });
    req.userId = user.uuid;
    req.role = user.role;
    next();
}

export const guardAuthorizationAdmin = async (req, res, next) => {
    const user = await TblUser.findOne({
        where: {
            uuid: req.userId
        }
    });
    if (!user) return res.status(404).json({ errors: [{ msg: "User tidak ditemukan" }] });
    if (user.role !== 'admin') return res.status(403).json({ errors: [{ msg: "Akses ditolak" }] });
    next();
}