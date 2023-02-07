import { requiredParam } from '../../infrastructure/helpers/validations'

class PlansActionControls {
  constructor({
    id_plans_action_controls,
    plansAction = requiredParam('plansAction', language),
    controls = requiredParam('controls', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_plans_action_controls = id_plans_action_controls;
    this.plansAction = plansAction;
    this.controls = controls;
    this.user = user;
  }
}

export default PlansActionControls;