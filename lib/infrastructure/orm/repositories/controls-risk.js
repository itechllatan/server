import CommonRepository from './common';
import ControlsRiskSchema from '../schemas/controls-risk'
import { getRepository, getConnection } from 'typeorm';

class ControlsRiskRepository extends CommonRepository {
  constructor() {
    super(ControlsRiskSchema);
    this.conn = getRepository(ControlsRiskSchema)
  }

}

export default ControlsRiskRepository;
