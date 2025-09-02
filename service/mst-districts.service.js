import db from '../models/index.js'
import { parse } from 'csv-parse/sync'

const { TblMstDistricts } = db;

export const uploadDistrictsCSV = async (buffer) => {
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
				id_regencies: parseInt(row.id_regencies),
				name_districts: row.name_districts,
			}
			await TblMstDistricts.upsert(data, { transaction: t })
			count++
		}
	})
	return { count }
}

export const getAllDistricts = async () => {
    return await TblMstDistricts.findAll({
        attributes: ["id", "name_districts"],
        order: [["name_districts", "ASC"]],
    })
}