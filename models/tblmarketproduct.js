'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class TblMarketProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TblMarketProduct.belongsTo(models.TblMarketData, {
        foreignKey: 'id_market',
        as: 'market_data_product'
      })
    }
  }
  TblMarketProduct.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_market: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TblMarketProduct',
    tableName: 'tbl_market_product',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });
  return TblMarketProduct;
};