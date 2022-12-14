class General {
  constructor(
    { frequencyRepository,
      impactRepository,
      typeProcessRepository,
      categoryProcessRepository,
      heatMapRepository,
      unitTimeRepository,
    }) {
    this.frequencyRepository = frequencyRepository;
    this.impactRepository = impactRepository;
    this.typeProcessRepository = typeProcessRepository;
    this.categoryProcessRepository = categoryProcessRepository;
    this.heatMapRepository = heatMapRepository;
    this.unitTimeRepository = unitTimeRepository
  }

  async getFrequencyRisks() {
    return await this.frequencyRepository.findAll({
      fields: ['id_frequency_risk', 'description', 'weight'],
      order: {
        id_frequency_risk: 'ASC'
      }
    });
  }

  async getFrequencyRisksByHeatMap(heatMap){
    return await this.frequencyRepository.findAll({
      fields: ['id_frequency_risk', 'description', 'weight'],
      where: { heatMap },
      order: {
        id_frequency_risk: 'ASC'
      }
    })
  }

  async getImpactRisksByHeatMap(heatMap){
    return await this.impactRepository.findAll({
      fields: ['id_impact_risk', 'description', 'weight'],
      where: { heatMap },
      order: {
        id_impact_risk: 'ASC'
      }
    })
  }

  async getImpactRisks() {
    return await this.impactRepository.findAll({
      fields: ['id_impact_risk', 'description', 'weight'],
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

  async getHeatMap() {
    return await this.heatMapRepository.findAll({
      fields: ["id_heat_map", "name", "description"],
      order: {
        id_heat_map: 'ASC'
      }
    })
  }

  async getUnitTime() {
    return await this.unitTimeRepository.findAll({
      fields: ['id_unit_time', 'description'],
      order: { id_unit_time: 'ASC' }
    });
  }
}

export default General;
