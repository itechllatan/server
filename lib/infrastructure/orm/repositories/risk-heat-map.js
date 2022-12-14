import CommonRepository from './common';
import RiskHeatMapSchema from '../schemas/risk-heat-map';
import { getRepository } from 'typeorm';

class RiskHeatMapRepository extends CommonRepository {
  constructor() {
    super(RiskHeatMapSchema);
    this.conn = getRepository(RiskHeatMapSchema)
  }
}

export default RiskHeatMapRepository;
