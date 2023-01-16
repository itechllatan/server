import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';
import Macroprocess from './macroprocess_id';
import Risk from './risk_id';

class MacroprocessRisk {
  constructor({
    id_macroprocess_risk,
    macroprocess = requiredParam('process', language),
    risk_heat_map = requiredParam('risk_heat_map', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_macroprocess_risk = id_macroprocess_risk;
    this.macroprocess = new Macroprocess({ validators: {}, ...macroprocess });
    this.risk_heat_map = risk_heat_map;
    this.user = new UserProcess({ validators: {}, ...user });
  }
}

export default MacroprocessRisk;