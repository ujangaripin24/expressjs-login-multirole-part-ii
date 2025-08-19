import * as userService from '../service/user.service.js'

export const GetAllUser = async (req, res) => {
    try {
        const users = await userService.GetAllUser();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        await userService.createUser(req.body);
        res.json({ "msg": "user success created" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        await userService.updateUser(req.params.uuid, req.body);
        res.json({ "msg": "user success updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.uuid);
        res.json({ "msg": "user success deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserByID = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.params.uuid);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}