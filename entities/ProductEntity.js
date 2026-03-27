class ProductEntity {
  constructor({ name, productCategoryId, productSituationId }) {
    this.name = name;
    this.productCategoryId = productCategoryId;
    this.productSituationId = productSituationId;
  }

  // Validação pura dos dados
  isValid() {
    if (!this.name || typeof this.name !== 'string' || this.name.trim() === '') return false;
    if (!this.productCategoryId || typeof this.productCategoryId !== 'number') return false;
    if (!this.productSituationId || typeof this.productSituationId !== 'number') return false;
    return true;
  }
}

module.exports = ProductEntity;