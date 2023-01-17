import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';
import Subprocess from './subprocess_id';
import Risk from './risk_id';

class SubprocessRisk {
  constructor({
    id_subprocess_risk,
    subprocess = requiredParam('process', language),
    risk_heat_map = requiredParam('risk_heat_map', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_subprocess_risk = id_subprocess_risk;
    this.subprocess = new Subprocess({ validators: {}, ...subprocess });
    this.risk_heat_map = risk_heat_map;
    this.user = user;
  }
}

export default SubprocessRisk;