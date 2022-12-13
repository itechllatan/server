import { requiredParam } from '../../infrastructure/helpers/validations'
import Controls from './controls_id';
import Variables from './variables_id';
import VariablesOptions from './variables-options_id';

class ControlsVariables{
  constructor({
    id_controls_variables,
    controls = requiredParam('controls', language),
    variables = requiredParam('variables', language),
    variablesOptions = requiredParam('variablesOptions', language),
    user,
    language
  }) {
    this.id_controls_variables = id_controls_variables;
    this.controls = new Controls({ validators: {}, ...controls });
    this.variables = new Variables({ validators: {}, ...variables });
    this.variablesOptions = new VariablesOptions({ validators: {}, ...variablesOptions });
    this.user = user;
  }
}

export default ControlsVariables;