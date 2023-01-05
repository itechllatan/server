import CommonRepository from './common';
import RiskFactorsMasterSchema from '../schemas/risk-factors-master';
import { getRepository } from 'typeorm';

class RiskFactorsMasterRepository extends CommonRepository {
  constructor() {
    super(RiskFactorsMasterSchema);
    this.conn = getRepository(RiskFactorsMasterSchema)
  }
}

export default RiskFactorsMasterRepository;
