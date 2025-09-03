import * as userService from '../service/user.service.js'

export const GetAllUser = async (req, res) => {
    try {
        const { page, size, search } = req.query;

        const result = await userService.GetAllUser({ page, size, search });

        if (!result.data || result.data.length === 0) {
            return res.status(200).json({ msg: "tidak ada data" });
        }

        res.status(200).json({
            status: 200,
            data: result.data,
            size: result.size,
            page: result.page,
            totalPage: result.totalPage,
            totalData: result.totalData
        });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}

export const createUser = async (req, res) => {
    try {
        await userService.createUser(req.body);
        res.json({ msg: "user success created" });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}

export const updateUser = async (req, res) => {
    try {
        await userService.updateUser(req.params.uuid, req.body);
        res.json({ msg: "user success updated" });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}

export const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.uuid);
        res.json({ msg: "user success deleted" });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}

export const getUserByID = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.params.uuid);
        res.json(user);
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}