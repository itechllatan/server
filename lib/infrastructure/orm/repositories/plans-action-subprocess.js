import CommonRepository from './common';
import PlansActionSubprocessSchema from '../schemas/plans-action-subprocess'
import { getRepository } from 'typeorm';

class PlansActionSubprocessRepository extends CommonRepository {
  constructor() {
    super(PlansActionSubprocessSchema);
    this.conn = getRepository(PlansActionSubprocessSchema)
  }
}

export default PlansActionSubprocessRepository;
