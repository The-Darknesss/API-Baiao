const userService = require('../services/UserService');

module.exports = {
  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      // Retorna 400 (Bad Request) para erros de validação
      return res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const result = await userService.getAllUsers(req);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },

  async getById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      return res.json(user);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      return res.json(user);
    } catch (error) {
      // Se o erro for "Usuário não encontrado", idealmente seria 404, mas simplificamos no catch
      const status = error.message.includes('não encontrado') ? 404 : 400;
      return res.status(status).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      return res.status(204).send(); // 204 = No Content (Sucesso, sem corpo de resposta)
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
};