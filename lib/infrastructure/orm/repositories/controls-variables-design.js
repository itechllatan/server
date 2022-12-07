import CommonRepository from './common';
import ControlsVariablesDesignSchema from '../schemas/controls-variables-design';
import { getRepository, getConnection } from 'typeorm';

class ControlsVariablesDesignRepository extends CommonRepository {
  constructor() {
    super(ControlsVariablesDesignSchema);
    this.conn = getRepository(ControlsVariablesDesignSchema)
  }
}

export default ControlsVariablesDesignRepository;;
