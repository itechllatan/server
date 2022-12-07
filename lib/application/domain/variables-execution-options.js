import { requiredParam } from '../../infrastructure/helpers/validations'
import VariablesExecution from './variables-execution_id';

class VariablesExecutionOptions {
  constructor({
    id_variables_execution_options,
    name = requiredParam('name', language),
    description,
    weight = requiredParam('weight', language),
    toDefault,
    variablesExecution = requiredParam('variablesExecution', language),
    language
  }) {
    this.id_variables_execution_options = id_variables_execution_options;
    this.name = name;
    this.description = description;
    this.weight = weight;
    this.toDefault = toDefault;
    this.variablesExecution = new VariablesExecution({ validators: {}, ...variablesExecution });
  }
}

export default VariablesExecutionOptions;