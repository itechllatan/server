import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';

class VariablesDesign {
  constructor({
    id_variables_design,
    name = requiredParam('name', language),
    description,
    weight = requiredParam('weight', language),
    user,
    language
  }) {
    this.id_variables_design = id_variables_design;
    this.name = name;
    this.description = description;
    this.weight = weight;
    this.user = new UserProcess({ validators: {}, ...user });
  }
}

export default VariablesDesign;