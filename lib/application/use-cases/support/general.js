class General {
  constructor({ frequencyRepository, impactRepository, riskTypeRepository }) {
    this.frequencyRepository = frequencyRepository;
    this.impactRepository = impactRepository;
    this.riskTypeRepository = riskTypeRepository;
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

  async getRiskTypes() {
    return await this.riskTypeRepository.findAll({
      fields: ['id_risk_type', 'description'],
      order: {
        id_risk_type: 'ASC'
      }
    })
  }
}

export default General;
