import db from "../models/index.js"
import fs from "fs"
import csv from "csv-parser"
import { resolve } from "path";
import { rejects } from "assert";
const { TblMstProvince } = db;

export const uploadProvinceCSV = async (filePath) => {
  return new Promise((resolve, rejects) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push({
          id: parseInt(row.id),
          name_provinces: row.name_provinces,
        });
      })
      .on("end", async () => {
        try {
          await TblMstProvince.bulkCreate(results, {
            ignoreDuplicates: true,
          });

          resolve({
            message: "Data provinsi berhasil diimport",
            count: results.length,
          })
        } catch (error) {
          rejects(error)
        }
      })
      .on("error", (error) => {
        rejects(error)
      })
  })
}

export const getAllProvinces = async () => {
  return await TblMstProvince.findAll({
    attributes: ["id", "name_province"],
    order: [["name_province", "ASC"]],
  })
}