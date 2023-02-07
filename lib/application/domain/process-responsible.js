import { requiredParam } from '../../infrastructure/helpers/validations'
class ProcessResponsible {
  constructor({
    id_process_responsible,
    process = requiredParam('process', language),
    responsibles = requiredParam('responsibles', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_process_responsible = id_process_responsible;
    this.process = process;
    this.responsibles = responsibles;
    this.user = user;
  }
}

export default ProcessResponsible;