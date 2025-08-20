'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class TblProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TblProduct.belongsTo(models.TblUser, {
        foreignKey: 'userId',
        targetKey: 'uuid'
      });
    }
  }
  TblProduct.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    link_picture: DataTypes.STRING,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'TblProduct',
    tableName: 'tbl_products',
    freezeTableName: true
  });
  return TblProduct;
};