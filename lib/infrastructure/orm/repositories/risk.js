import CommonRepository from './common';
import RiskSchema from '../schemas/risk';
import { getRepository } from 'typeorm';

class RiskRepository extends CommonRepository {
  constructor() {
    super(RiskSchema);
    this.conn = getRepository(RiskSchema)
  }
}

export default RiskRepository;
