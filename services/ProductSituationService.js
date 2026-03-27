const { ProductSituation } = require('../models');
const ProductSituationEntity = require('../entities/ProductSituationEntity');
const PaginationService = require('./PaginationService');

class ProductSituationService {
  async createSituation(data) {
    const entity = new ProductSituationEntity(data);
    if (!entity.isValid()) throw new Error('O nome da situação do produto é obrigatório.');
    
    return await ProductSituation.create({ name: entity.name });
  }

  async getAllSituations(req) {
    return await PaginationService.paginate(ProductSituation, req, {
      order: [['createdAt', 'DESC']]
    });
  }

  async getSituationById(id) {
    const situation = await ProductSituation.findByPk(id);
    if (!situation) throw new Error('Situação de produto não encontrada.');
    return situation;
  }

  async updateSituation(id, data) {
    const situation = await ProductSituation.findByPk(id);
    if (!situation) throw new Error('Situação de produto não encontrada.');

    const entity = new ProductSituationEntity(data);
    if (!entity.isValid()) throw new Error('O nome da situação do produto é obrigatório.');

    await situation.update({ name: entity.name });
    return situation;
  }

  async deleteSituation(id) {
    const situation = await ProductSituation.findByPk(id);
    if (!situation) throw new Error('Situação de produto não encontrada.');
    
    await situation.destroy();
    return true;
  }
}

module.exports = new ProductSituationService();