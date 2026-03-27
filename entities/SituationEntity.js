class SituationEntity {
  constructor({ nameSituation }) {
    this.nameSituation = nameSituation;
  }

  isValid() {
    if (!this.nameSituation || typeof this.nameSituation !== 'string' || this.nameSituation.trim() === '') {
      return false;
    }
    return true;
  }
}

module.exports = SituationEntity;