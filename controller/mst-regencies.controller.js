import * as regenciesService from "../service/mst-regencies.service.js"

export const uploadRegencies = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ errors: [{ msg: "File CSV harus diupload" }] });
        }
        const result = await regenciesService.uploadRegenciesCSV(req.file.buffer);
        res.status(200).json({
            status: 200,
            message: "Import data provinsi berhasil",
            totalData: result.count,
        });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}

export const getAllRegencies = async (req, res) => {
    try {
        const { search } = req.query;
        const provinces = await regenciesService.getAllRegencies(search);

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

export const getRegenciesByProvince = async (req, res) => {
    try {
        const { provinceId } = req.params;
        const { search } = req.query;
        const regencies = await regenciesService.getRegenciesByProvince(provinceId, search);
        console.log("controller: ", provinceId)

        if (!regencies || regencies.length === 0) {
            return res.status(404).json({ errors: [{ msg: "Tidak ada data regencies untuk provinsi ini" }] });
        }

        res.status(200).json({
            status: 200,
            provinceId,
            data: regencies,
        });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}