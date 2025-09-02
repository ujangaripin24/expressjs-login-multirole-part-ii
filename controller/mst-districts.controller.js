import * as districtsService from '../service/mst-districts.service.js'

export const uploadDistricts = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "File CSV harus diupload" });
    }
    const result = await districtsService.uploadDistrictsCSV(req.file.buffer);
    res.status(200).json({
      status: 200,
      message: "Import data provinsi berhasil",
      totalData: result.count,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
}

export const getAllDistricts = async (req, res) => {
  try {
    const provinces = await districtsService.getAllDistricts();

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
}
