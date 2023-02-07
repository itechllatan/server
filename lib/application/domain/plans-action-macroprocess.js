import { requiredParam } from '../../infrastructure/helpers/validations'

class PlansActionMacroProcess {
  constructor({
    id_plans_action_macrop,
    plansAction = requiredParam('plansAction', language),
    macroprocess = requiredParam('macroprocess', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_plans_action_macrop = id_plans_action_macrop;
    this.plansAction = plansAction;
    this.macroprocess = macroprocess;
    this.user = user;
  }
}

export default PlansActionMacroProcess;