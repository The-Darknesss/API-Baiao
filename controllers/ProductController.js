const { Product, ProductCategory, ProductSituation } = require('../models');
const PaginationService = require('../services/PaginationService');

module.exports = {
  // CREATE
  async create(req, res) {
    try {
      const { name, productCategoryId, productSituationId } = req.body;
      const product = await Product.create({ name, productCategoryId, productSituationId });
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

// READ - Listar todos com Paginação via Service e Relacionamentos Duplos
  async getAll(req, res) {
    try {
      const result = await PaginationService.paginate(Product, req, {
        include: [
          { model: ProductCategory, as: 'productCategory' },
          { model: ProductSituation, as: 'productSituation' }
        ],
        order: [['createdAt', 'DESC']]
      });

      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // READ - Buscar por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [
          { model: ProductCategory, as: 'productCategory' },
          { model: ProductSituation, as: 'productSituation' }
        ]
      });

      if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // UPDATE
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, productCategoryId, productSituationId } = req.body;

      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

      await product.update({ name, productCategoryId, productSituationId });
      return res.json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // DELETE
  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      
      if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

      await product.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};