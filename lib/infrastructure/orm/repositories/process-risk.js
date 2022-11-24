import CommonRepository from './common';
import ProcessRiskSchema from '../schemas/process-risk'
import { getRepository } from 'typeorm';

class ProcessRiskRepository extends CommonRepository {
  constructor() {
    super(ProcessRiskSchema);
    this.conn = getRepository(ProcessRiskSchema)
  }
}

export default ProcessRiskRepository;
