const crypto = require('crypto');
const { User } = require('../models');

class AuthService {
  /**
   * Gera um token de recuperação e salva no usuário.
   * Em produção: o token seria enviado por email.
   * Neste projeto educacional: o token é retornado diretamente na resposta.
   */
  async forgotPassword(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Nenhum usuário encontrado com este email.');

    // Gera um token aleatório de 32 bytes (64 caracteres hexadecimais)
    const token = crypto.randomBytes(32).toString('hex');

    // Salva o token no campo recoverPassword do usuário
    await user.update({ recoverPassword: token });

    return {
      message: 'Token de recuperação gerado com sucesso. Em produção, seria enviado por email.',
      token
    };
  }

  /**
   * Valida o token e redefine a senha do usuário.
   * Após redefinir, o token é apagado (não pode ser reutilizado).
   */
  async resetPassword(token, newPassword) {
    if (!token) throw new Error('O campo token é obrigatório.');
    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      throw new Error('A nova senha deve ter no mínimo 6 caracteres.');
    }

    // unscoped() necessário pois recoverPassword está excluído do defaultScope
    const user = await User.unscoped().findOne({ where: { recoverPassword: token } });
    if (!user) throw new Error('Token inválido ou já utilizado.');

    // Salva a nova senha em texto puro e apaga o token
    await user.update({ password: newPassword, recoverPassword: null });

    return { message: 'Senha redefinida com sucesso.' };
  }
}

module.exports = new AuthService();
