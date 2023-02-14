import RiskFactorRisk from "../../domain/risk-factor-risk";

class RiskFactorRiskUC {
  constructor({ riskFactorRiskRepository }) {
    this.riskFactorRiskRepository = riskFactorRiskRepository;
  }

  async getRiskFactorByRiskHeatMap(id) {
    return await this.riskFactorRiskRepository.findAll({
      relations: ['risk_factor', 'risk_heat_map'],
      where: { risk_heat_map: id, deleted_at: null }
    });
  }

  async saveRiskFactorRisk(info, user, language) {
    info.user = user.id_user;
    this.info = new RiskFactorRisk({
      validators: {},
      ...info,
    });

    const saveInfo = await this.riskFactorRiskRepository.save(this.info);
    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    return {
      saveInfo,
    };
  }
  async deleteRiskFactorRisk(id){
    try {
      return await this.riskFactorRiskRepository.delete(id);
    } catch (e) {
      return e;
    }
  }
}

export default RiskFactorRiskUC;
