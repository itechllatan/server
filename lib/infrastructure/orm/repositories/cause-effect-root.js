import CommonRepository from './common';
import CauseEffectRootSchema from '../schemas/cause-effect-root';
import { getRepository } from 'typeorm';

class CauseEffectRootRepository extends CommonRepository {
  constructor() {
    super(CauseEffectRootSchema);
    this.conn = getRepository(CauseEffectRootSchema)
  }
}

export default CauseEffectRootRepository;
