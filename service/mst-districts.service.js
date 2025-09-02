import { Op } from 'sequelize';
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

export const getDistrictsByRegencies = async (regenciesId, search) => {
  const where = { id_regencies: regenciesId }

  if (search) {
    where.name_districts = {
      [Op.iLike]: `%${search}%`
    }
  }

  return await TblMstDistricts.findAll({
    where,
    attributes: ["id", "id_regencies", "name_districts"],
    order: [["name_districts", "ASC"]]
  })
}