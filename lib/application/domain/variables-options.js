import { requiredParam } from '../../infrastructure/helpers/validations'
import Variables from './variables_id';

class VariablesOptions {
  constructor({
    id_variables_options,
    name = requiredParam('name', language),
    description,
    weight = requiredParam('weight', language),
    toDefault,
    variables = requiredParam('variables', language),
    language
  }) {
    this.id_variables_options = id_variables_options;
    this.name = name;
    this.description = description;
    this.weight = weight;
    this.toDefault = toDefault;
    this.variables = new Variables({ validators: {}, ...variables });
  }
}

export default VariablesOptions;