import { requiredParam } from '../../infrastructure/helpers/validations'
import TypeProcess from './type-process';
import CategoryProcess from './category-process'
import UserProcess from './user-process';

class MacroProcess {
  constructor({
    id_macro_process,
    name = requiredParam('name', language),
    description,
    evidence,
    typeProcess = requiredParam('typeProcess', language),
    categoryProcess = requiredParam('categoryProcess', language),
    user = requiredParam('user', language),
    language
  }) {
    this.id_macro_process = id_macro_process;
    this.name = name;
    this.description = description;
    this.evidence = evidence;
    this.typeProcess = new TypeProcess({ validators: {}, ...typeProcess });
    this.categoryProcess = new CategoryProcess({ validators: {}, ...categoryProcess });
    this.user = new UserProcess({ validators: {}, ...user });
  }
}

export default MacroProcess;