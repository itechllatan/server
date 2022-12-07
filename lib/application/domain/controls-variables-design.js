import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';
import Controls from './controls_id';
import VariablesDesign from './variables-design_id'
import VariablesDesignOptionsId from './variables-design-options_id'

class ControlsVariablesDesign {
  constructor({
    id_controls_var_design,
    controls = requiredParam('controls', language),
    variablesDesign = requiredParam('variablesDesign', language),
    variablesDesignOptions = requiredParam('variablesDesignOptions', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_controls_var_design = id_controls_var_design;
    this.controls = new Controls({ validators: {}, ...controls });
    this.variablesDesign = new VariablesDesign({ validators: {}, ...variablesDesign });
    this.variablesDesignOptions = new VariablesDesignOptionsId({ validators: {}, ...variablesDesignOptions });
    this.user = new UserProcess({ validators: {}, ...user });
  }
}

export default ControlsVariablesDesign;