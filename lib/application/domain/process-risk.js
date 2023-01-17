import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';
import Process from './process_id';
import Risk from './risk_id';

class ProcessRisk {
  constructor({
    id_process_risk,
    process = requiredParam('process', language),
    risk_heat_map = requiredParam('risk_heat_map', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_process_risk = id_process_risk;
    this.process = new Process({ validators: {}, ...process });
    this.risk_heat_map = risk_heat_map;
    this.user = user;
  }
}

export default ProcessRisk;