'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MasterProvince extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MasterProvince.init({
    id: DataTypes.INTEGER,
    name_provinces: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MasterProvince',
  });
  return MasterProvince;
};