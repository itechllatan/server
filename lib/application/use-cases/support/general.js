class General {
  constructor({ frequencyRepository, impactRepository }) {
    this.frequencyRepository = frequencyRepository;
    this.impactRepository = impactRepository;
  }

  async getFrequencyRisks() {
    return await this.frequencyRepository.findAll({
        fields: ['id_frequency_risk', 'description', 'percentage'],
        order: {
            id_frequency_risk: 'ASC'
        }
    });
  }

  async getImpactRisks() {
    return await this.impactRepository.findAll({
        fields: ['id_impact_risk', 'description', 'percentage'],
        order: {
            id_impact_risk: 'ASC'
        }
    });
  }
}

export default General;
