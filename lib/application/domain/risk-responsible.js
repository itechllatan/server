import { requiredParam } from '../../infrastructure/helpers/validations'

class RiskResponsible {
  constructor({
    id_risk_responsible,
    responsible = requiredParam('responsible', language),
    risk_heat_map = requiredParam('risk_heat_map', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_risk_responsible = id_risk_responsible;
    this.responsible = responsible;
    this.risk_heat_map = risk_heat_map;
    this.user = user;
  }
}

export default RiskResponsible;