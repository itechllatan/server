import { requiredParam } from '../../infrastructure/helpers/validations'
import TypeProcess from './type-process';
import CategoryProcess from './category-process'
import UserProcess from './user-process';

class MacroProcess {
  constructor({
    id_macro_process,
    name = requiredParam('name', language),
    description,
    evidence = requiredParam('name', language),
    typeProcess = requiredParam('typeProcess', language),
    categoryProcess = requiredParam('categoryProcess', language),
    user = requiredParam('user', language),
    created_at,
    deleted_at,
    update_at,
    language
  }) {
    this.id_macro_process = id_macro_process;
    this.name = name;
    this.description = description;
    this.evidence = evidence;
    this.typeProcess = new TypeProcess({ validators: {}, ...typeProcess });
    this.categoryProcess = new CategoryProcess({ validators: {}, ...categoryProcess });
    this.user = new UserProcess({ validators: {}, ...user });
    this.created_at = created_at;
    this.deleted_at = deleted_at;
    this.update_at = update_at;
  }
}

export default MacroProcess;