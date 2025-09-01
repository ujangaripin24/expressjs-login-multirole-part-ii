'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('tbl_users', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email_on_tbl_users'
    });

    await queryInterface.addColumn('tbl_users', 'link_picture', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_users', 'unique_email_on_tbl_users');
    await queryInterface.removeColumn('tbl_users', 'link_picture');
  }
};
