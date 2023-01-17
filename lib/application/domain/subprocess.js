import { requiredParam } from '../../infrastructure/helpers/validations'
import TypeProcess from './type-process';
import CategoryProcess from './category-process'
import UserProcess from './user-process';
import Process from './process_id';

class SubProcess {
  constructor({
    id_subprocess,
    name = requiredParam('name', language),
    description,
    evidence = requiredParam('name', language),
    typeProcess = requiredParam('typeProcess', language),
    categoryProcess = requiredParam('categoryProcess', language),
    user = requiredParam('user', language),
    process = requiredParam('process', language),
    language
  }) {
    this.id_subprocess = id_subprocess;
    this.name = name;
    this.description = description;
    this.evidence = evidence;
    this.typeProcess = new TypeProcess({ validators: {}, ...typeProcess });
    this.categoryProcess = new CategoryProcess({ validators: {}, ...categoryProcess });
    this.user = user;
    this.process = new Process({ validators: {}, ...process });
  }
}

export default SubProcess;