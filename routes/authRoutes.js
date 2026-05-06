const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// POST /api/auth/forgot-password — envia o email e retorna o token (educacional)
router.post('/auth/forgot-password', AuthController.forgotPassword);

// POST /api/auth/reset-password — valida o token e redefine a senha
router.post('/auth/reset-password', AuthController.resetPassword);

module.exports = router;
