import { requiredParam } from '../../infrastructure/helpers/validations'
class SubprocessResponsible {
  constructor({
    id_subprocess_responsible,
    subprocess = requiredParam('subprocess', language),
    responsibles = requiredParam('responsibles', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_subprocess_responsible = id_subprocess_responsible;
    this.subprocess = subprocess;
    this.responsibles = responsibles;
    this.user = user;
  }
}

export default SubprocessResponsible;