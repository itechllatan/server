import CommonRepository from './common';
import SubprocessRiskSchema from '../schemas/subprocess-risk'
import { getRepository } from 'typeorm';

class SubprocessRiskRepository extends CommonRepository {
  constructor() {
    super(SubprocessRiskSchema);
    this.conn = getRepository(SubprocessRiskSchema)
  }
}

export default SubprocessRiskRepository;
