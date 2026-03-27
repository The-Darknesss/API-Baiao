class UserEntity {
  constructor({ name, email, situationId }) {
    this.name = name;
    this.email = email;
    this.situationId = situationId;
  }

  // Validação pura da regra de negócio, sem depender de banco de dados
  isValid() {
    if (!this.name || typeof this.name !== 'string') return false;
    if (!this.email || !this.email.includes('@')) return false;
    if (!this.situationId || typeof this.situationId !== 'number') return false;
    return true;
  }
}

module.exports = UserEntity;