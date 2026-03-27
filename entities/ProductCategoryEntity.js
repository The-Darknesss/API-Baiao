class ProductCategoryEntity {
  constructor({ name }) {
    this.name = name;
  }

  isValid() {
    if (!this.name || typeof this.name !== 'string' || this.name.trim() === '') {
      return false;
    }
    return true;
  }
}

module.exports = ProductCategoryEntity;