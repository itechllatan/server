import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';
import Controls from './controls_id';
import VariablesExecution from './variables-execution_id'
import VariablesExecutionOptionsId from './variables-execution-options_id'

class ControlsVariablesExecution {
  constructor({
    id_controls_var_execution,
    controls = requiredParam('controls', language),
    variablesExecution = requiredParam('variablesExecution', language),
    variablesExecutionOptions = requiredParam('variablesExecutionOptions', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_controls_var_execution = id_controls_var_execution;
    this.controls = new Controls({ validators: {}, ...controls });
    this.variablesExecution = new VariablesExecution({ validators: {}, ...variablesExecution });
    this.variablesExecutionOptions = new VariablesExecutionOptionsId({ validators: {}, ...variablesExecutionOptions });
    this.user = new UserProcess({ validators: {}, ...user });
  }
}

export default ControlsVariablesExecution;