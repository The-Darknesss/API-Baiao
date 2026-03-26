'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Inserindo Categorias
    await queryInterface.bulkInsert('ProductCategories', [
      { name: 'Eletrônicos', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vestuário', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // Inserindo Situações do Produto
    await queryInterface.bulkInsert('ProductSituations', [
      { name: 'Disponível em Estoque', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Esgotado', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductCategories', null, {});
    await queryInterface.bulkDelete('ProductSituations', null, {});
  }
};