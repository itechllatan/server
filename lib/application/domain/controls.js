import { requiredParam } from '../../infrastructure/helpers/validations'
import Solidity from '../domain/solidity_id'

class Controls {
  constructor({
    id_controls,
    name = requiredParam('name', language),
    qualification_design = requiredParam('qualification_design', language),
    qualification_execution = requiredParam('qualification_execution', language),
    final_design = requiredParam('final_design', language),
    final_execution = requiredParam('final_execution', language),
    value_solidity = requiredParam('value_solidity', language),
    solidityGeneral = requiredParam('solidityGeneral', language),
    solidityDesign = requiredParam('solidityDesign', language),
    solidityExecution = requiredParam('solidityExecution', language),
    description,
    user,
    language
  }) {
    this.id_controls = id_controls;
    this.name = name;
    this.qualification_design = qualification_design;
    this.qualification_execution = qualification_execution;

    this.final_design = final_design;
    this.final_execution = final_execution;
    this.value_solidity = value_solidity;

    this.solidityGeneral = new Solidity({ validators: {}, ...solidityGeneral });;
    this.solidityDesign = new Solidity({ validators: {}, ...solidityDesign });;
    this.solidityExecution = new Solidity({ validators: {}, ...solidityExecution });;

    this.description = description;
    this.user = user;
  }
}

export default Controls;