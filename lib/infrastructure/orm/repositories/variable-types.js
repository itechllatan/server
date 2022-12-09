import CommonRepository from './common';
import VariableTypesSchema from '../schemas/variable-types';
import { getRepository } from 'typeorm';

class VariableTypesRepository extends CommonRepository {
  constructor() {
    super(VariableTypesSchema);
    this.conn = getRepository(VariableTypesSchema)
  }
}

export default VariableTypesRepository;
