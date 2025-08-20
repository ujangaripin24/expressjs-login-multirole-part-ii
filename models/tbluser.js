'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class TblUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TblUser.hasMany(models.TblProduct, {
        foreignKey: 'userId',
        sourceKey: 'uuid'
      });
    }
  }
  TblUser.init({
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(['manual', 'google', 'facebook']),
      allowNull: false,
      defaultValue: 'manual'
    },
    role: {
      type: DataTypes.ENUM(['admin', 'user']),
      allowNull: false,
      defaultValue: 'user'
    },
    link_picture: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TblUser',
    tableName: 'tbl_users',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });
  return TblUser;
};