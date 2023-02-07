import { requiredParam } from '../../infrastructure/helpers/validations'
import Macroprocess from './macroprocess_id';

class MacroprocessResponsible {
  constructor({
    id_macroprocess_responsible,
    macroprocess = requiredParam('macroprocess', language),
    responsibles = requiredParam('responsibles', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_macroprocess_responsible = id_macroprocess_responsible;
    this.macroprocess = new Macroprocess({ validators: {}, ...macroprocess });
    this.responsibles = responsibles;
    this.user = user;
  }
}

export default MacroprocessResponsible;