'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TblMstDistricts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TblMstDistricts.belongsTo(models.TblMstRegencies, {
        foreignKey: 'id_regencies',
        as: 'regencies'
      });
    }
  }
  TblMstDistricts.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_regencies: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name_districts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'TblMstDistricts',
    tableName: 'tbl_master_districts',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });
  return TblMstDistricts;
};