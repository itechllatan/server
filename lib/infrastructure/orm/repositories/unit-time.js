import CommonRepository from './common';
import UnitTimeSchema from '../schemas/unit-time'
import { getRepository } from 'typeorm';

class UnitTimeRepository extends CommonRepository {
  constructor() {
    super(UnitTimeSchema);
    this.conn = getRepository(UnitTimeSchema)
  }
}

export default UnitTimeRepository;
