import CommonRepository from './common';
import RiskResponsibleSchema from '../schemas/risk-responsible'
import { getRepository } from 'typeorm';

class RiskResponsibleRepository extends CommonRepository {
  constructor() {
    super(RiskResponsibleSchema);
    this.conn = getRepository(RiskResponsibleSchema)
  }
}

export default RiskResponsibleRepository;
