import db from '../models/index.js'
const { TblUser } = db

export const guardMiddleware = async (req, res, next) => {
    try {
        let userId = null
        let role = null

        if (req.session && req.session.userId) {
            const user = await TblUser.findOne({ where: { uuid: req.session.userId } })
            if (!user) {
                return res.status(404).json({ errors: [{ msg: "User tidak ditemukan" }] })
            }
            userId = user.uuid,
                role = user.role
        } else {
            const authHeader = req.headers['authorization']
            if (!authHeader) {
                return res.status(401).json({ errors: [{ msg: "Mohon login kembali" }] })
            }

            const token = authHeader.split(' ')[1]
            try {
                const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
                const user = await TblUser.findOne({ where: { uuid: decoded.uuid } })
                if (!user) {
                    return res.status(404).json({ errors: [{ msg: "User tidak ditemukan" }] })
                }
                userId = user.uuid
                role = user.role
            } catch (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ errors: [{ msg: "Token sudah kadaluarsa" }] })
                }
                return res.status(403).json({ errors: [{ msg: "Token tidak valid" }] })
            }
        }
        req.userId = userId
        req.role = role
        next()
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }

}

export const guardAuthorizationAdmin = async (req, res, next) => {
    try {
        const user = await TblUser.findOne({ where: { uuid: req.userId } })
        if (!user) return res.status(404).json({ errors: [{ msg: "User tidak ditemukan" }] })
        if (user.role !== 'admin') {
            return res.status(403).json({ errors: [{ msg: "Akses ditolak" }] })
        }
        next()
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}