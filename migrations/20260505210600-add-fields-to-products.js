'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'slug', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });

    await queryInterface.addColumn('Products', 'description', {
      type: Sequelize.TEXT('long'),
      allowNull: false,
      defaultValue: ''
    });

    await queryInterface.addColumn('Products', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'slug');
    await queryInterface.removeColumn('Products', 'description');
    await queryInterface.removeColumn('Products', 'price');
  }
};
