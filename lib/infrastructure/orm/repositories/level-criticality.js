import CommonRepository from './common';
import LevelCriticalitySchema from '../schemas/level-criticality'
import { getRepository } from 'typeorm';

class LevelCriticalityRepository extends CommonRepository {
  constructor() {
    super(LevelCriticalitySchema);
    this.conn = getRepository(LevelCriticalitySchema)
  }
}

export default LevelCriticalityRepository;
