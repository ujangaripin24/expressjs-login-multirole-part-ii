import * as authService from '../service/auth.service.js';

export const loginUser = async (req, res) => {
    try {
        const user = await authService.loginUser(req.body.email, req.body.password)
        req.session.userId = user.uuid;
        const { uuid, name, email, role } = user;
        res.status(200).json({ uuid, name, email, role })
    } catch (error) {
        if (error.message.includes("Email")) {
            return res.status(404).json({ msg: error.message });
        }
        if (error.message.includes("Password")) {
            return res.status(400).json({ msg: error.message });
        }
        res.status(500).json({ msg: error.message });
    }
}

export const getProfile = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Mohon login kembali" });
        }

        const user = await authService.getProfile(req.session.userId);
        res.status(200).json(user);

    } catch (error) {
        if (error.message.includes("User")) {
            return res.status(404).json({ msg: error.message });
        }
        res.status(500).json({ msg: error.message });
    }
}

export const Logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
        res.status(200).json({ msg: "Anda telah logout" });
    });
}