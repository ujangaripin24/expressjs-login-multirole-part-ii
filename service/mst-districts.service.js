import db from '../models/index.js'
import { parse } from 'csv-parse/sync'

const { TblMstDistricts } = db;

export const uploadDistrictsCSV = async (buffer) => {
  const csvString = buffer.toString()

  const records = parse(csvString, {
    columns: true,
    skip_empty_lines: true
  }).map(row => ({
    id: parseInt(row.id),
    id_regencies: parseInt(row.id_regencies),
    name_districts: row.name_districts,
  }))

  await TblMstDistricts.bulkCreate(records, {
    updateOnDuplicate: ['id_regencies', 'name_districts']
  })

  return { count: records.length }
}

export const getAllDistricts = async () => {
  return await TblMstDistricts.findAll({
    attributes: ["id", "name_districts"],
    order: [["name_districts", "ASC"]],
  })
}

export const getDistrictsByRegencies = async (regenciesId) => {
  return await TblMstDistricts.findAll({
    where: { id_regencies: regenciesId },
    attributes: ["id", "id_regencies", "name_districts"],
    order: [["name_districts", "ASC"]]
  })
}