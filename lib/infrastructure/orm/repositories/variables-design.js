import CommonRepository from './common';
import VariablesDesignSchema from '../schemas/variables-design';
import { getRepository } from 'typeorm';

class VariablesDesignRepository extends CommonRepository {
  constructor() {
    super(VariablesDesignSchema);
    this.conn = getRepository(VariablesDesignSchema)
  }
}

export default VariablesDesignRepository;
