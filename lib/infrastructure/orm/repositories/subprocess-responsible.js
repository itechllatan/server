import CommonRepository from './common';
import SubprocessResponsibleSchema from '../schemas/subprocess-responsible'
import { getRepository, getConnection } from 'typeorm';

class SubprocessResponsibleRepository extends CommonRepository {
  constructor() {
    super(SubprocessResponsibleSchema);
    this.conn = getRepository(SubprocessResponsibleSchema)
  }
}

export default SubprocessResponsibleRepository;
