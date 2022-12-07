import CommonRepository from './common';
import ControlsVariablesExecuteSchema from '../schemas/controls-variables-execution';
import { getRepository, getConnection } from 'typeorm';

class ControlsVariablesExecutionRepository extends CommonRepository {
  constructor() {
    super(ControlsVariablesExecuteSchema);
    this.conn = getRepository(ControlsVariablesExecuteSchema)
  }
}

export default ControlsVariablesExecutionRepository