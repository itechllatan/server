import CommonRepository from './common';
import RiskVariableFrequencySchema from '../schemas/risk-variable-frequency';
import { getRepository } from 'typeorm';

class RiskVariableFrequencyRepository extends CommonRepository {
  constructor() {
    super(RiskVariableFrequencySchema);
    this.conn = getRepository(RiskVariableFrequencySchema)
  }
}

export default RiskVariableFrequencyRepository;
