class ProductEntity {
  constructor({ name, description, price, productCategoryId, productSituationId, slug }) {
    this.name = name;
    // Gera o slug automaticamente a partir do nome, a não ser que já seja enviado
    this.slug = slug || this._generateSlug(name);
    this.description = description;
    this.price = price;
    this.productCategoryId = productCategoryId;
    this.productSituationId = productSituationId;
  }

  /**
   * Gera um slug URL-friendly a partir de uma string.
   * Ex: "Teclado Mecânico RGB" → "teclado-mecanico-rgb"
   */
  _generateSlug(name) {
    if (!name || typeof name !== 'string') return '';
    return name
      .normalize('NFD')                    // Separa letras de acentos (ex: "ã" → "a" + "~")
      .replace(/[\u0300-\u036f]/g, '')      // Remove os acentos soltos
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')        // Remove caracteres especiais
      .replace(/\s+/g, '-')                // Espaços viram hífens
      .replace(/-+/g, '-');               // Múltiplos hífens viram um só
  }

  // Validação pura dos dados
  isValid() {
    if (!this.name || typeof this.name !== 'string' || this.name.trim() === '') return false;
    if (!this.slug || this.slug.trim() === '') return false;
    if (!this.description || typeof this.description !== 'string' || this.description.trim() === '') return false;
    if (this.price === undefined || this.price === null) return false;
    if (isNaN(Number(this.price)) || Number(this.price) < 0) return false;
    if (!this.productCategoryId || typeof this.productCategoryId !== 'number') return false;
    if (!this.productSituationId || typeof this.productSituationId !== 'number') return false;
    return true;
  }
}

module.exports = ProductEntity;