import { requiredParam } from '../../infrastructure/helpers/validations'

class CategoryProcess {
  constructor({
    id_category_process,
    description,
    language
  }) {

    this.id_category_process = id_category_process;
    this.description = description;
  }
}

export default CategoryProcess;