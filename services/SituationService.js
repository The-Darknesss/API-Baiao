const { Situation } = require('../models');
const SituationEntity = require('../entities/SituationEntity');
const PaginationService = require('./PaginationService');

class SituationService {
  async createSituation(data) {
    const entity = new SituationEntity(data);
    if (!entity.isValid()) throw new Error('O campo nameSituation é obrigatório.');
    
    return await Situation.create({ nameSituation: entity.nameSituation });
  }

  async getAllSituations(req) {
    return await PaginationService.paginate(Situation, req, {
      order: [['createdAt', 'DESC']]
    });
  }

  async getSituationById(id) {
    const situation = await Situation.findByPk(id);
    if (!situation) throw new Error('Situação de usuário não encontrada.');
    return situation;
  }

  async updateSituation(id, data) {
    const situation = await Situation.findByPk(id);
    if (!situation) throw new Error('Situação de usuário não encontrada.');

    const entity = new SituationEntity(data);
    if (!entity.isValid()) throw new Error('O campo nameSituation é obrigatório.');

    await situation.update({ nameSituation: entity.nameSituation });
    return situation;
  }

  async deleteSituation(id) {
    const situation = await Situation.findByPk(id);
    if (!situation) throw new Error('Situação de usuário não encontrada.');
    
    await situation.destroy();
    return true;
  }
}

module.exports = new SituationService();