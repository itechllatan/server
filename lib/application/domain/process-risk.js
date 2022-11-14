import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';
import Process from './process_id';
import Risk from './risk_id';

class SubProcess {
  constructor({
    id_process_risk = requiredParam('id_process_risk', language),
    process = requiredParam('process', language),
    risk = requiredParam('risk', language),
    user = requiredParam('user', language),
    created_at,
    deleted_at,
    update_at,
    language
  }) {
    this.id_process_risk = id_process_risk;
    this.process = new Process({ validators: {}, ...process });
    this.risk = new Risk({ validators: {}, ...risk });
    this.user = new UserProcess({ validators: {}, ...user });
    this.created_at = created_at;
    this.deleted_at = deleted_at;
    this.update_at = update_at;
  }
}

export default SubProcess;