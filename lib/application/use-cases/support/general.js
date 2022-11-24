class General {
  constructor({ frequencyRepository, impactRepository, typeProcessRepository, categoryProcessRepository, heatMapRepository }) {
    this.frequencyRepository = frequencyRepository;
    this.impactRepository = impactRepository;
    this.typeProcessRepository = typeProcessRepository;
    this.categoryProcessRepository = categoryProcessRepository;
    this.heatMapRepository = heatMapRepository;
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

  async getTypeProcess() {
    return await this.typeProcessRepository.findAll({
      fields: ["id_type_process", "description"],
      order: {
        id_type_process: 'ASC'
      }
    });
  }

  async getCategoryProcess() {
    return await this.categoryProcessRepository.findAll({
      fields: ["id_category_process", "description"],
      order: {
        id_category_process: 'ASC'
      }
    });
  }

  async getHeatMap(){
    return await this.heatMapRepository.findAll({
      fields: ["id_heat_map", "name", "description"],
      order: {
        id_heat_map: 'ASC'
      }
    })
  }
}

export default General;
