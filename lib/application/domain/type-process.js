import { requiredParam } from '../../infrastructure/helpers/validations'

class TypeProcess {
  constructor({
    id_type_process,
    description,
    language
  }) {

    this.id_type_process = id_type_process;
    this.description = description;
  }
}

export default TypeProcess;