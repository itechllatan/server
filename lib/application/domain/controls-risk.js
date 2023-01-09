import { requiredParam } from '../../infrastructure/helpers/validations'
import Controls from './controls_id'

class ControlsRisk {
  constructor({
    id_controls_risk,
    mitigate_impact = requiredParam('mitigate_impact', language),
    mitigate_frequency = requiredParam('mitigate_frequency', language),
    controls = requiredParam('controls', language),
    risk_heat_map = requiredParam('risk_heat_map', language),
    user,
  }) {
    this.id_controls_risk = id_controls_risk;
    this.mitigate_impact = mitigate_impact;
    this.mitigate_frequency = mitigate_frequency;
    this.controls = new Controls({ validators: {}, ...controls });
    this.risk_heat_map = risk_heat_map;
    this.user = user;
  }
}

export default ControlsRisk;