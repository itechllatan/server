import CommonRepository from './common';
import ImpactSchema from '../schemas/impact-risk';
import { getRepository } from 'typeorm';

class ImpactRepository extends CommonRepository {
  constructor() {
    super(ImpactSchema);
    this.conn = getRepository(ImpactSchema)
  }
}

export default ImpactRepository;
