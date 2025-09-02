import * as provinceService from "../service/mst-province.service.js"

export const uploadProvince = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ errors: [{ msg: "File CSV harus diupload" }] });
        }

        const result = await provinceService.uploadProvinceCSV(req.file.buffer);
        res.status(200).json({
            status: 200,
            message: "Import data provinsi berhasil",
            totalData: result.count,
        });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}

export const getAllProvince = async (req, res) => {
    try {
        const {search} = req.query;
        const provinces = await provinceService.getAllProvinces(search);

        if (!provinces || provinces.length === 0) {
            return res.status(200).json({ errors: [{ msg: "tidak ada data" }] });
        }

        res.status(200).json({
            status: 200,
            data: provinces,
        });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
};