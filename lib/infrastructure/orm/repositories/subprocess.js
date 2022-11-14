import CommonRepository from './common';
import SubprocessSchema from '../schemas/subprocess';
import { getRepository } from 'typeorm';

class ProcessRepository extends CommonRepository {
  constructor() {
    super(SubprocessSchema);
    this.conn = getRepository(SubprocessSchema)
  }
}

export default ProcessRepository;
