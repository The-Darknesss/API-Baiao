class PaginationService {
  /**
   * Método genérico para paginar qualquer Model do Sequelize
   * @param {Object} model - O Model do Sequelize (ex: User, Product)
   * @param {Object} req - O objeto de requisição do Express (para pegar req.query)
   * @param {Object} options - Opções extras como 'include', 'where', 'order'
   */
  static async paginate(model, req, options = {}) {
    // Pega a página e o limite da URL (ex: ?page=2&limit=5), com valores padrão
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    // Executa a busca no banco repassando as opções extras (como os relacionamentos)
    const { count, rows } = await model.findAndCountAll({
      limit,
      offset,
      ...options 
    });

    // Retorna o objeto formatado
    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows
    };
  }
}

module.exports = PaginationService;