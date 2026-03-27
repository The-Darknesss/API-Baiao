const { ProductCategory } = require('../models');
const ProductCategoryEntity = require('../entities/ProductCategoryEntity');
const PaginationService = require('./PaginationService');

class ProductCategoryService {
  async createCategory(data) {
    const entity = new ProductCategoryEntity(data);
    if (!entity.isValid()) throw new Error('O nome da categoria é obrigatório e inválido.');
    
    return await ProductCategory.create({ name: entity.name });
  }

  async getAllCategories(req) {
    // Paginação simples, sem includes pois não depende de outras tabelas
    return await PaginationService.paginate(ProductCategory, req, {
      order: [['createdAt', 'DESC']]
    });
  }

  async getCategoryById(id) {
    const category = await ProductCategory.findByPk(id);
    if (!category) throw new Error('Categoria não encontrada.');
    return category;
  }

  async updateCategory(id, data) {
    const category = await ProductCategory.findByPk(id);
    if (!category) throw new Error('Categoria não encontrada.');

    const entity = new ProductCategoryEntity(data);
    if (!entity.isValid()) throw new Error('O nome da categoria é obrigatório e inválido.');

    await category.update({ name: entity.name });
    return category;
  }

  async deleteCategory(id) {
    const category = await ProductCategory.findByPk(id);
    if (!category) throw new Error('Categoria não encontrada.');
    
    await category.destroy();
    return true;
  }
}

module.exports = new ProductCategoryService();