import { requiredParam } from '../../infrastructure/helpers/validations'

class Controls {
  constructor({
    id_controls,
    name = requiredParam('name', language),
    qualification_design = requiredParam('qualification_design', language),
    qualification_execution = requiredParam('qualification_execution', language),
    description,
    user = requiredParam('user', language),
    language
  }) {
    this.id_controls = id_controls;
    this.name = name;
    this.qualification_design = qualification_design;
    this.qualification_execution = qualification_execution;
    this.description = description;
    this.user = user;
  }
}

export default Controls;