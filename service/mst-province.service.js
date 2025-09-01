import db from "../models/index.js"
import { parse } from "csv-parse/sync";
const { TblMstProvince } = db;

export const uploadProvinceCSV = async (buffer) => {
  const csvString = buffer.toString();

  const records = parse(csvString, {
    columns: true,
    skip_empty_lines: true
  });

  const data = records.map((row) => ({
    id: parseInt(row.id),
    name_provinces: row.name_provinces,
  }));

  await TblMstProvince.bulkCreate(data, { ignoreDuplicates: true });

  return { count: data.length };
}

export const getAllProvinces = async () => {
  return await TblMstProvince.findAll({
    attributes: ["id", "name_province"],
    order: [["name_province", "ASC"]],
  })
}