import { requiredParam } from '../../infrastructure/helpers/validations'
import VariablesDesign from './variables-design_id'

class VariablesDesignOptions {
  constructor({
    id_variables_design_options,
    name = requiredParam('name', language),
    description,
    weight = requiredParam('weight', language),
    toDefault,
    variablesDesign = requiredParam('variablesDesign', language),
    language
  }) {
    this.id_variables_design_options = id_variables_design_options;
    this.name = name;
    this.description = description;
    this.weight = weight;
    this.toDefault = toDefault;
    this.variablesDesign = new VariablesDesign({ validators: {}, ...variablesDesign });
  }
}

export default VariablesDesignOptions;