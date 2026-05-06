class UserEntity {
  constructor({ name, email, password, situationId }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.situationId = situationId;
  }

  // Validação base (usada no UPDATE — senha não obrigatória)
  isValid() {
    if (!this.name || typeof this.name !== 'string') return false;
    if (!this.email || !this.email.includes('@')) return false;
    if (!this.situationId || typeof this.situationId !== 'number') return false;
    return true;
  }

  // Validação completa (usada no CREATE — senha obrigatória)
  isValidForCreate() {
    if (!this.isValid()) return false;
    if (!this.password || typeof this.password !== 'string' || this.password.length < 6) return false;
    return true;
  }
}

module.exports = UserEntity;