import CommonRepository from './common';
import VariablesContinuitySchema from '../schemas/variables-continuity';
import { getRepository } from 'typeorm';

class VariablesContinuityRepository extends CommonRepository {
  constructor() {
    super(VariablesContinuitySchema);
    this.conn = getRepository(VariablesContinuitySchema)
  }
}

export default VariablesContinuityRepository;