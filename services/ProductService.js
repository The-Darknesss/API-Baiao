const { Product, ProductCategory, ProductSituation } = require('../models');
const ProductEntity = require('../entities/ProductEntity');
const PaginationService = require('./PaginationService');

class ProductService {
  // CREATE
  async createProduct(data) {
    const productEntity = new ProductEntity(data);

    if (!productEntity.isValid()) {
      throw new Error('Dados inválidos. O produto precisa de nome, descrição, preço (≥ 0), ID da categoria e ID da situação.');
    }

    // Verifica se o slug gerado já existe no banco
    const slugExists = await Product.findOne({ where: { slug: productEntity.slug } });
    if (slugExists) throw new Error(`O slug "${productEntity.slug}" já está em uso. Tente um nome diferente para o produto.`);

    const newProduct = await Product.create({
      name: productEntity.name,
      slug: productEntity.slug,
      description: productEntity.description,
      price: productEntity.price,
      productCategoryId: productEntity.productCategoryId,
      productSituationId: productEntity.productSituationId
    });

    return newProduct;
  }

  // READ (Todos com Paginação e Relacionamentos Duplos)
  async getAllProducts(req) {
    return await PaginationService.paginate(Product, req, {
      include: [
        { model: ProductCategory, as: 'productCategory' },
        { model: ProductSituation, as: 'productSituation' }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  // READ (Por ID)
  async getProductById(id) {
    const product = await Product.findByPk(id, {
      include: [
        { model: ProductCategory, as: 'productCategory' },
        { model: ProductSituation, as: 'productSituation' }
      ]
    });

    if (!product) throw new Error('Produto não encontrado.');
    return product;
  }

  // UPDATE
  async updateProduct(id, data) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Produto não encontrado.');

    const productEntity = new ProductEntity(data);
    if (!productEntity.isValid()) {
      throw new Error('Dados inválidos. Verifique os campos do produto.');
    }

    // Verifica se o novo slug já pertence a OUTRO produto
    if (productEntity.slug !== product.slug) {
      const slugExists = await Product.findOne({ where: { slug: productEntity.slug } });
      if (slugExists) throw new Error(`O slug "${productEntity.slug}" já está em uso.`);
    }

    await product.update({
      name: productEntity.name,
      slug: productEntity.slug,
      description: productEntity.description,
      price: productEntity.price,
      productCategoryId: productEntity.productCategoryId,
      productSituationId: productEntity.productSituationId
    });

    return product;
  }

  // DELETE
  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Produto não encontrado.');

    await product.destroy();
    return true;
  }
}

module.exports = new ProductService();