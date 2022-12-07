import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';

class VariablesExecution {
  constructor({
    id_variables_execution,
    name = requiredParam('name', language),
    description,
    weight = requiredParam('weight', language),
    user,
    language
  }) {
    this.id_variables_execution = id_variables_execution;
    this.name = name;
    this.description = description;
    this.weight = weight;
    this.user = new UserProcess({ validators: {}, ...user });
  }
}

export default VariablesExecution;