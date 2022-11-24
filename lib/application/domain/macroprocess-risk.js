import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';
import Macroprocess from './macroprocess_id';
import Risk from './risk_id';

class MacroprocessRisk {
  constructor({
    id_macroprocess_risk,
    macroprocess = requiredParam('process', language),
    risk = requiredParam('risk', language),
    user = requiredParam('user', language),
    created_at,
    deleted_at,
    update_at,
    language
  }) {
    this.id_macroprocess_risk = id_macroprocess_risk;
    this.macroprocess = new Macroprocess({ validators: {}, ...macroprocess });
    this.risk = new Risk({ validators: {}, ...risk });
    this.user = new UserProcess({ validators: {}, ...user });
    this.created_at = created_at;
    this.deleted_at = deleted_at;
    this.update_at = update_at;
  }
}

export default MacroprocessRisk;