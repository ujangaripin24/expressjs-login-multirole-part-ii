import db from "../models/index.js"
import {parse} from "csv-parse/sync";

const { TblMstProvince } = db;

export const uploadProvinceCSV = async (buffer) => {
  const csvString = buffer.toString();

  const records = parse(csvString, {
    columns: true,
    skip_empty_lines: true
  });

  let count = 0;

  await db.sequelize.transaction(async (t) => {
    for (const row of records) {
      const data = {
        id: parseInt(row.id),
        name_provinces: row.name_provinces,
      };
      await TblMstProvince.upsert(data, { transaction: t });
      count++;
    }
  })
  return { count };
}

export const getAllProvinces = async () => {
  return await TblMstProvince.findAll({
    attributes: ["id", "name_provinces"],
    order: [["name_provinces", "ASC"]],
  })
}

export const getRegenciesByProvince = async (provinceId) => {
    return await TblMstProvince.findAll({
        where: {id_provinces: provinceId},
        attributes: ["id", "id_provinces", "name_regencies"],
        include: [
            {
                model: TblMstProvince,
                attributes: ["id", "name_provinces"]
            }
        ],
        order: [["name_regencies", "ASC"]],
    });
}