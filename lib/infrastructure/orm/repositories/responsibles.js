import CommonRepository from './common';
import ResponsiblesSchema from '../schemas/responsibles'
import { getRepository, getConnection, getManager } from 'typeorm';

class ResponsiblesRepository extends CommonRepository {
  constructor() {
    super(ResponsiblesSchema);
    this.conn = getRepository(ResponsiblesSchema)
  }

}

export default ResponsiblesRepository;
