import { requiredParam } from '../../infrastructure/helpers/validations'
import PlansAction from './plans-action_id';

class PlansActionRisk {
  constructor({
    id_plans_action_risk,
    plansAction = requiredParam('plansAction', language),
    risk_heat_map = requiredParam('risk_heat_map', language),
    user,
    language
  }) {
    this.id_plans_action_risk = id_plans_action_risk;
    this.plansAction = new PlansAction({ validators: {}, ...plansAction });
    this.risk_heat_map = risk_heat_map;
    this.user = user;
  }
}

export default PlansActionRisk;