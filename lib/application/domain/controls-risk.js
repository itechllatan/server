import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';
import Risk from './risk_id';
import Controls from './controls_id'

class ControlsRisk {
  constructor({
    id_controls_risk,
    controls = requiredParam('controls', language),
    risk = requiredParam('risk', language),
    user,
  }) {
    this.id_controls_risk = id_controls_risk;
    this.controls = new Controls({ validators: {}, ...controls });
    this.risk = new Risk({ validators: {}, ...risk });
    this.user = user;
  }
}

export default ControlsRisk;