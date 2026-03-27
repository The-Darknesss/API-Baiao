const categoryService = require('../services/ProductCategoryService');

module.exports = {
  async create(req, res) {
    try {
      const category = await categoryService.createCategory(req.body);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const result = await categoryService.getAllCategories(req);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },

  async getById(req, res) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      return res.json(category);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const category = await categoryService.updateCategory(req.params.id, req.body);
      return res.json(category);
    } catch (error) {
      const status = error.message.includes('não encontrada') ? 404 : 400;
      return res.status(status).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await categoryService.deleteCategory(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
};