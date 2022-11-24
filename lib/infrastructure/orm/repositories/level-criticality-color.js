import CommonRepository from './common';
import LevelCriticalityColorSchema from '../schemas/level-criticality-color'
import { getRepository } from 'typeorm';

class LevelCriticalityColorRepository extends CommonRepository {
  constructor() {
    super(LevelCriticalityColorSchema);
    this.conn = getRepository(LevelCriticalityColorSchema)
  }
}

export default LevelCriticalityColorRepository;