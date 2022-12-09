import CommonRepository from './common';
import VariablesSchema from '../schemas/variables';
import { getRepository } from 'typeorm';

class VariablesRepository extends CommonRepository {
  constructor() {
    super(VariablesSchema);
    this.conn = getRepository(VariablesSchema)
  }
}

export default VariablesRepository;
