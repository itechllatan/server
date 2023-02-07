import CommonRepository from './common';
import PlansActionControlsSchema from '../schemas/plans-action-controls'
import { getRepository } from 'typeorm';

class PlansActionControlsRepository extends CommonRepository {
  constructor() {
    super(PlansActionControlsSchema);
    this.conn = getRepository(PlansActionControlsSchema)
  }
}

export default PlansActionControlsRepository;
