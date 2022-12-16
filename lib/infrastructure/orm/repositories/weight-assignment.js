import CommonRepository from './common';
import WeightAssignmentSchema from '../schemas/weight-assignment'
import { getRepository, getConnection, getManager } from 'typeorm';

class WeightAssignmentRepository extends CommonRepository {
  constructor() {
    super(WeightAssignmentSchema);
    this.conn = getRepository(WeightAssignmentSchema)
  }

}

export default WeightAssignmentRepository;
