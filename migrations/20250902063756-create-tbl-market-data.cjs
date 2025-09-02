'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_market_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_provinces: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbl_master_provinces',
          key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      id_regencies: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbl_master_regencies',
          key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      id_districts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbl_master_districts',
          key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      market_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      market_address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 7),
        allowNull: true
      },
      longitude: {
        type: Sequelize.DECIMAL(10, 7),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_market_data');
  }
};