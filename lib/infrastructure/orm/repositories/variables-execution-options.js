import CommonRepository from './common';
import VariablesExecutionOptionsSchema from '../schemas/variables-execution-options'
import { getRepository } from 'typeorm';

class VariablesExecutionOptionsRepository extends CommonRepository {
  constructor() {
    super(VariablesExecutionOptionsSchema);
    this.conn = getRepository(VariablesExecutionOptionsSchema)
  }
}

export default VariablesExecutionOptionsRepository;
