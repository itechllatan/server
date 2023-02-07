import CommonRepository from './common';
import PlansActionProcessSchema from '../schemas/plans-action-process'
import { getRepository } from 'typeorm';

class PlansActionProcessRepository extends CommonRepository {
  constructor() {
    super(PlansActionProcessSchema);
    this.conn = getRepository(PlansActionProcessSchema)
  }
}

export default PlansActionProcessRepository;
