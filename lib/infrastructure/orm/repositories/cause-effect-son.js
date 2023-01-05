import CommonRepository from './common';
import CauseEffectSonSchema from '../schemas/cause-effect-son';
import { getRepository } from 'typeorm';

class CauseEffectSonRepository extends CommonRepository {
  constructor() {
    super(CauseEffectSonSchema);
    this.conn = getRepository(CauseEffectSonSchema)
  }
}

export default CauseEffectSonRepository;
