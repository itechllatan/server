import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';
import Subprocess from './subprocess_id';
import Risk from './risk_id';

class SubprocessRisk {
  constructor({
    id_subprocess_risk,
    subprocess = requiredParam('process', language),
    risk = requiredParam('risk', language),
    user = requiredParam('user', language),
    created_at,
    deleted_at,
    update_at,
    language
  }) {
    this.id_subprocess_risk = id_subprocess_risk;
    this.subprocess = new Subprocess({ validators: {}, ...subprocess });
    this.risk = new Risk({ validators: {}, ...risk });
    this.user = new UserProcess({ validators: {}, ...user });
    this.created_at = created_at;
    this.deleted_at = deleted_at;
    this.update_at = update_at;
  }
}

export default SubprocessRisk;