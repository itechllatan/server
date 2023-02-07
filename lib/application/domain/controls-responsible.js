import { requiredParam } from '../../infrastructure/helpers/validations'

class ControlsResponsible {
  constructor({
    id_controls_responsible,
    controls = requiredParam('controls', language),
    responsibles = requiredParam('responsibles', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_controls_responsible = id_controls_responsible;
    this.controls = controls;
    this.responsibles = responsibles;
    this.user = user;
  }
}

export default ControlsResponsible;