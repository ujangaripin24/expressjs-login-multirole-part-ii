'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class TblMstRegencies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TblMstRegencies.belongsTo(models.TblMstProvince, {
        foreignKey: 'id_provinces',
        as: 'province'
      });
    }
  }
  TblMstRegencies.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_provinces: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name_regencies: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'TblMstRegencies',
    tableName: 'tbl_master_regencies',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });
  return TblMstRegencies;
};