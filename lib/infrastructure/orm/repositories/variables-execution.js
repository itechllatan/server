import CommonRepository from './common';
import VariablesExecutionSchema from '../schemas/variables-execution';
import { getRepository } from 'typeorm';

class VariablesExecutionRepository extends CommonRepository {
  constructor() {
    super(VariablesExecutionSchema);
    this.conn = getRepository(VariablesExecutionSchema)
  }
}

export default VariablesExecutionRepository;
