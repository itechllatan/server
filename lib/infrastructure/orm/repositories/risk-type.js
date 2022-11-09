import CommonRepository from './common';
import RiskTypeSchema from '../schemas/risk-type';
import { getRepository } from 'typeorm';

class ImpactRepository extends CommonRepository {
  constructor() {
    super(RiskTypeSchema);
    this.conn = getRepository(RiskTypeSchema)
  }
}

export default ImpactRepository;
