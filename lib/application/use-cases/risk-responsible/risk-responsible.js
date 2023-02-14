import RiskResponsible from "../../domain/risk-responsible";

class RiskResponsibleUC {
  constructor({ riskResponsibleRepository }) {
    this.riskResponsibleRepository = riskResponsibleRepository;
  }

  async getResponsibleByRiskHeatMap(id) {
    return await this.riskResponsibleRepository.findAll({
      relations: ['responsible', 'risk_heat_map'],
      where: { risk_heat_map: id, deleted_at: null }
    });
  }

  async saveRiskResponsible(info, user, language) {
    info.user = user.id_user;
    this.info = new RiskResponsible({
      validators: {},
      ...info,
    });

    const saveInfo = await this.riskResponsibleRepository.save(this.info);
    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    return {
      saveInfo,
    };
  }

  async deleteRiskResponsible(id){
    try {
      return await this.riskResponsibleRepository.delete(id);
    } catch (e) {
        return e;
    }
  }
}

export default RiskResponsibleUC;
