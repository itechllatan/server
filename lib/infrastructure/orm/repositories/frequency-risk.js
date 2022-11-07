import CommonRepository from './common';
import FrequencySchema from '../schemas/frequency-risk';
import { getRepository } from 'typeorm';

class FrequencyRepository extends CommonRepository {
  constructor() {
    super(FrequencySchema);
    this.conn = getRepository(FrequencySchema)
  }
}

export default FrequencyRepository;
