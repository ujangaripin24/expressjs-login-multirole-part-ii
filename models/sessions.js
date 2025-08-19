'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Sessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sessions.init({
    sid: DataTypes.STRING,
    expires: DataTypes.DATE,
    data: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Sessions',
    tableName: 'Sessions',
    timestamps: true
  });
  return Sessions;
};