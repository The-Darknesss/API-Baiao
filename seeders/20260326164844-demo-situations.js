'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Situations', [
      {
        nameSituation: 'Ativo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nameSituation: 'Inativo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Situations', null, {});
  }
};