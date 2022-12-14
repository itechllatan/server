import CommonRepository from './common';
import PlansActionRiskSchema from '../schemas/plans-action-risk'
import { getRepository, getConnection } from 'typeorm';

class PlansActionRiskRepository extends CommonRepository {
  constructor() {
    super(PlansActionRiskSchema);
    this.conn = getRepository(PlansActionRiskSchema)
  }
}

export default PlansActionRiskRepository;
