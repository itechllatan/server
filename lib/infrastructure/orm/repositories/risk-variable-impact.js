import CommonRepository from './common';
import RiskVariableImpactSchema from '../schemas/risk-variable-impact';
import { getRepository } from 'typeorm';

class RiskVariableImpactRepository extends CommonRepository {
  constructor() {
    super(RiskVariableImpactSchema);
    this.conn = getRepository(RiskVariableImpactSchema)
  }
}

export default RiskVariableImpactRepository;
