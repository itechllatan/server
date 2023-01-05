import CommonRepository from './common';
import CauseEffectSchema from '../schemas/cause-effect';
import { getRepository } from 'typeorm';

class CauseEffectRepository extends CommonRepository {
  constructor() {
    super(CauseEffectSchema);
    this.conn = getRepository(CauseEffectSchema)
  }
}

export default CauseEffectRepository;
