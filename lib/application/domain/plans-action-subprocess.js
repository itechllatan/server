import { requiredParam } from '../../infrastructure/helpers/validations'

class PlansActionSubprocess {
  constructor({
    id_plans_action_subprocess,
    plansAction = requiredParam('plansAction', language),
    subprocess = requiredParam('subprocess', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_plans_action_subprocess = id_plans_action_subprocess;
    this.plansAction = plansAction;
    this.subprocess = subprocess;
    this.user = user;
  }
}

export default PlansActionSubprocess;