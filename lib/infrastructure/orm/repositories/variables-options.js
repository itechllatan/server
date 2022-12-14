import CommonRepository from './common';
import VariablesOptionsSchema from '../schemas/variables-options'
import { getRepository } from 'typeorm';

class VariablesOptionsRepository extends CommonRepository {
  constructor() {
    super(VariablesOptionsSchema);
    this.conn = getRepository(VariablesOptionsSchema)
  }
}

export default VariablesOptionsRepository;
