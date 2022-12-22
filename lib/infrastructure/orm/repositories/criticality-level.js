import CommonRepository from './common';
import CriticalityLevelSchema from '../schemas/criticality-level'
import { getRepository } from 'typeorm';

class CriticalityLevelRepository extends CommonRepository {
  constructor() {
    super(CriticalityLevelSchema);
    this.conn = getRepository(CriticalityLevelSchema)
  }
}

export default CriticalityLevelRepository;
