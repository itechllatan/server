import CommonRepository from './common';
import PlansActionSchema from '../schemas/plans-action'
import { getRepository } from 'typeorm';

class PlansActionRepository extends CommonRepository {
  constructor() {
    super(PlansActionSchema);
    this.conn = getRepository(PlansActionSchema)
  }
}

export default PlansActionRepository;
