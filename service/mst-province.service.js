import db from "../models/index.js"
import { parse } from "csv-parse/sync";
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
    attributes: ["id", "name_province"],
    order: [["name_province", "ASC"]],
  })
}