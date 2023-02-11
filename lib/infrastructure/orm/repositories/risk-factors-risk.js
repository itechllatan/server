import CommonRepository from './common';
import RiskFactorRiskSchema from '../schemas/risk-factor-risk'
import { getRepository } from 'typeorm';

class RiskFactorRiskRepository extends CommonRepository {
  constructor() {
    super(RiskFactorRiskSchema);
    this.conn = getRepository(RiskFactorRiskSchema)
  }
}

export default RiskFactorRiskRepository;
