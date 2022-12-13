import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';
import Risk from './risk_id';
import PlansAction from './plans-action_id';

class PlansActionRisk {
  constructor({
    id_plans_action_risk,
    plansAction = requiredParam('plansAction', language),
    risk = requiredParam('risk', language),
    user,
    language
  }) {
    this.id_plans_action_risk = id_plans_action_risk;
    this.plansAction = new PlansAction({ validators: {}, ...plansAction });
    this.risk = new Risk({ validators: {}, ...risk });
    this.user = user;
  }
}

export default PlansActionRisk;