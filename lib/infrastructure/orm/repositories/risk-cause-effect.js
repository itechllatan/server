import CommonRepository from './common';
import RiskCauseEffectSchema from '../schemas/risk-cause-effect';
import { getRepository } from 'typeorm';

class RiskCauseEffectRepository extends CommonRepository {
  constructor() {
    super(RiskCauseEffectSchema);
    this.conn = getRepository(RiskCauseEffectSchema)
  }
}

export default RiskCauseEffectRepository;
