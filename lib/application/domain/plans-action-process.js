import { requiredParam } from '../../infrastructure/helpers/validations'

class PlansActionProcess {
  constructor({
    id_plans_action_process,
    plansAction = requiredParam('plansAction', language),
    process = requiredParam('process', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_plans_action_process = id_plans_action_process;
    this.plansAction = plansAction;
    this.process = process;
    this.user = user;
  }
}

export default PlansActionProcess;