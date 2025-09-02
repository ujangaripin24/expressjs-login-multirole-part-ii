import db from "../models/index.js";
import { parse } from "csv-parse/sync";

const { TblMstRegencies, TblMstProvince } = db;

export const uploadRegenciesCSV = async (buffer) => {
    const csvString = buffer.toString()

    const records = parse(csvString, {
        columns: true,
        skip_empty_lines: true
    })

    let count = 0

    await db.sequelize.transaction(async (t) => {
        for (const row of records) {
            const data = {
                id: parseInt(row.id),
                name_regencies: row.name_regencies,
                id_provinces: parseInt(row.id_provinces)
            }
            await TblMstRegencies.upsert(data, { transaction: t })
            count++
        }
    })
    return { count }
}

export const getAllRegencies = async () => {
    return await TblMstRegencies.findAll({
        attributes: ["id", "name_regencies"],
        order: [["name_regencies", "ASC"]],
    })
}

export const getRegenciesByProvince = async (provinceId) => {
    return await TblMstRegencies.findAll({
        where: {id_provinces: provinceId},
        attributes: ["id", "id_provinces", "name_regencies"],
        order: [["name_regencies", "ASC"]],
    });
}