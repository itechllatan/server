import CommonRepository from './common';
import ControlsResponsibleSchema from '../schemas/controls-responsible'
import { getRepository, getConnection } from 'typeorm';

class ControlsResponsibleRepository extends CommonRepository {
  constructor() {
    super(ControlsResponsibleSchema);
    this.conn = getRepository(ControlsResponsibleSchema)
  }
}

export default ControlsResponsibleRepository;
