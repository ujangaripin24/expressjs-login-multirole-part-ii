'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // When changing a column type in PostgreSQL from string to a numeric type,
    // you need to provide an explicit cast using the `USING` clause.
    // Sequelize's `changeColumn` doesn't support this directly, so we use a raw query.
    // The migration filename suggests converting to INTEGER.
    await queryInterface.sequelize.query('ALTER TABLE "tbl_market_product" ALTER COLUMN "price" TYPE INTEGER USING (TRIM(price)::INTEGER)');
    await queryInterface.sequelize.query('ALTER TABLE "tbl_market_product" ALTER COLUMN "price" SET NOT NULL');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * This reverts the column back to its original string type.
     */
    await queryInterface.changeColumn('tbl_market_product', 'price', {
      type: Sequelize.STRING,
      allowNull: true // Assuming the original column was nullable.
    });
  }
};
