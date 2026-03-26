const { User, Situation } = require('../models');
const PaginationService = require('../services/PaginationService'); // <--- Adicione esta linha

module.exports = {
  // CREATE - Criar usuário
  async create(req, res) {
    try {
      const { name, email, situationId } = req.body;
      const user = await User.create({ name, email, situationId });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

// READ - Listar todos com Paginação via Service
  async getAll(req, res) {
    try {
      const result = await PaginationService.paginate(User, req, {
        include: [{ model: Situation, as: 'situation' }],
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
      const user = await User.findByPk(id, {
        include: [{ model: Situation, as: 'situation' }]
      });

      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // UPDATE - Atualizar usuário
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, situationId } = req.body;

      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      await user.update({ name, email, situationId });
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // DELETE - Deletar usuário
  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      await user.destroy();
      return res.status(204).send(); // 204 significa "No Content" (sucesso sem retorno de corpo)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};