'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TblMstRegencies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TblMstRegencies.init({
    id: DataTypes.INTEGER,
    id_provinces: DataTypes.STRING,
    name_provinces: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TblMstRegencies',
  });
  return TblMstRegencies;
};