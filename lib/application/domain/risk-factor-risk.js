import { requiredParam } from '../../infrastructure/helpers/validations'

class RiskFactorRisk {
  constructor({
    id_risk_factors_risk,
    risk_factor = requiredParam('risk_factor', language),
    risk_heat_map = requiredParam('risk_heat_map', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_risk_factors_risk = id_risk_factors_risk;
    this.risk_factor = risk_factor;
    this.risk_heat_map = risk_heat_map;
    this.user = user;
  }
}

export default RiskFactorRisk;