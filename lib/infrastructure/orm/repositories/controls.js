import CommonRepository from './common';
import ControlsSchema from '../schemas/controls'
import { getRepository, getConnection, getManager } from 'typeorm';

class ControlsRepository extends CommonRepository {
  constructor() {
    super(ControlsSchema);
    this.conn = getRepository(ControlsSchema)
  }

}

export default ControlsRepository;
