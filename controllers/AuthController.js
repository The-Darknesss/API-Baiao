const authService = require('../services/AuthService');

module.exports = {
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: 'O campo email é obrigatório.' });

      const result = await authService.forgotPassword(email);
      return res.json(result);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      const result = await authService.resetPassword(token, newPassword);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};
