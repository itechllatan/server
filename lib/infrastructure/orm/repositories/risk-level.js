import CommonRepository from './common';
import RiskLevelSchema from '../schemas/risk-level';
import { getRepository } from 'typeorm';

class RiskLevelRepository extends CommonRepository {
  constructor() {
    super(RiskLevelSchema);
    this.conn = getRepository(RiskLevelSchema)
  }
}

export default RiskLevelRepository;
