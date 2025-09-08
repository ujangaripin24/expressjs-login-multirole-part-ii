'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class TblMarketData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relasi table provinsi
      TblMarketData.belongsTo(models.TblMstProvince, {
        foreignKey: 'id_provinces',
        as: 'provinces'
      })
      // relasi table kabupaten/kota
      TblMarketData.belongsTo(models.TblMstRegencies, {
        foreignKey: 'id_regencies',
        as: 'regencies'
      })
      // relasi table kecamatan/desa
      TblMarketData.belongsTo(models.TblMstDistricts, {
        foreignKey: 'id_districts',
        as: 'districts'
      })
      // relaseo table produk pasar
      TblMarketData.hasMany(models.TblMarketProduct, {
        foreignKey: 'id_market',
        as: 'market_product'
      })
    }
  }
  TblMarketData.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_provinces: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_regencies: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_districts: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    market_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    market_address: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 7)
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 7)
    }
  }, {
    sequelize,
    modelName: 'TblMarketData',
    tableName: 'tbl_market_data',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });
  return TblMarketData;
};