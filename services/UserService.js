const { User, Situation } = require('../models');
const UserEntity = require('../entities/UserEntity');
const PaginationService = require('./PaginationService');

class UserService {
  // CREATE
  async createUser(data) {
    const userEntity = new UserEntity(data);
    if (!userEntity.isValidForCreate()) {
      throw new Error('Dados inválidos. Verifique nome, email, senha (mín. 6 caracteres) e a situação.');
    }

    const emailExists = await User.findOne({ where: { email: userEntity.email } });
    if (emailExists) throw new Error('Este email já está cadastrado.');

    const newUser = await User.create({
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
      situationId: userEntity.situationId
    });

    return newUser;
  }

  // READ (Todos com Paginação)
  async getAllUsers(req) {
    return await PaginationService.paginate(User, req, {
      include: [{ model: Situation, as: 'situation' }],
      order: [['createdAt', 'DESC']]
    });
  }

  // READ (Por ID)
  async getUserById(id) {
    const user = await User.findByPk(id, {
      include: [{ model: Situation, as: 'situation' }]
    });
    if (!user) throw new Error('Usuário não encontrado.');
    return user;
  }

  // UPDATE
  async updateUser(id, data) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuário não encontrado.');

    const userEntity = new UserEntity(data);
    if (!userEntity.isValid()) {
      throw new Error('Dados inválidos. Verifique nome, email e a situação.');
    }

    // Verifica se o novo email já pertence a OUTRO usuário
    if (data.email !== user.email) {
      const emailExists = await User.findOne({ where: { email: data.email } });
      if (emailExists) throw new Error('Este email já está sendo usado por outro usuário.');
    }

    const updateData = {
      name: userEntity.name,
      email: userEntity.email,
      situationId: userEntity.situationId
    };

    // Se uma nova senha foi enviada, valida e salva em texto puro
    if (data.password) {
      if (typeof data.password !== 'string' || data.password.length < 6) {
        throw new Error('A senha deve ter no mínimo 6 caracteres.');
      }
      updateData.password = data.password;
    }

    await user.update(updateData);
    return user;
  }

  // DELETE
  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuário não encontrado.');

    await user.destroy();
    return true;
  }

  /**
   * Salva um token/código de recuperação de senha para o usuário.
   * @param {number} id - ID do usuário
   * @param {string} token - Token/código de recuperação
   */
  async setRecoverPassword(id, token) {
    const user = await User.unscoped().findByPk(id);
    if (!user) throw new Error('Usuário não encontrado.');

    await user.update({ recoverPassword: token });
    return true;
  }
}

module.exports = new UserService();