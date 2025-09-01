'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class TblMstProvince extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TblMstProvince.hasMany(models.TblMstRegencies, {
        foreignKey: 'id_provinces',
        as: 'regencies'
      });
    }
  }
  TblMstProvince.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name_provinces: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TblMstProvince',
    tableName: 'tbl_master_provinces',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });
  return TblMstProvince;
};