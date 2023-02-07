import CommonRepository from './common';
import ProcessResponsibleSchema from '../schemas/process-responsible'
import { getRepository, getConnection } from 'typeorm';

class ProcessResponsibleRepository extends CommonRepository {
  constructor() {
    super(ProcessResponsibleSchema);
    this.conn = getRepository(ProcessResponsibleSchema)
  }
}

export default ProcessResponsibleRepository;
