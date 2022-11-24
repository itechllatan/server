import CommonRepository from './common';
import RangesTimeSchema from '../schemas/ranges-time';
import { getRepository } from 'typeorm';

class RangesTimeRepository extends CommonRepository {
  constructor() {
    super(RangesTimeSchema);
    this.conn = getRepository(RangesTimeSchema)
  }
}

export default RangesTimeRepository;