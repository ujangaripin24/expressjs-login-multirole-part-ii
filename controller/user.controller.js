import * as userService from '../service/user.service.js'

export const GetAllUser = async (req, res) => {
    try {
        const users = await userService.GetAllUser();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}