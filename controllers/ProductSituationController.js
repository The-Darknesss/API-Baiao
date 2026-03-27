const situationService = require('../services/ProductSituationService');

module.exports = {
  async create(req, res) {
    try {
      const situation = await situationService.createSituation(req.body);
      return res.status(201).json(situation);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const result = await situationService.getAllSituations(req);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },

  async getById(req, res) {
    try {
      const situation = await situationService.getSituationById(req.params.id);
      return res.json(situation);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const situation = await situationService.updateSituation(req.params.id, req.body);
      return res.json(situation);
    } catch (error) {
      const status = error.message.includes('não encontrada') ? 404 : 400;
      return res.status(status).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await situationService.deleteSituation(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
};