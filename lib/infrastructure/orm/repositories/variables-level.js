import CommonRepository from './common';
import VariablesLevelSchema from '../schemas/variables-level'
import { getConnection, getRepository } from 'typeorm';

class VariablesLevelRepository extends CommonRepository {
  constructor() {
    super(VariablesLevelSchema);
    this.conn = getRepository(VariablesLevelSchema)
  }
}

export default VariablesLevelRepository;