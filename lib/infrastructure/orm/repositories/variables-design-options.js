import CommonRepository from './common';
import VariablesDesignOptionsSchema from '../schemas/variables-design-options';
import { getRepository } from 'typeorm';

class VariablesDesignOptionsRepository extends CommonRepository {
  constructor() {
    super(VariablesDesignOptionsSchema);
    this.conn = getRepository(VariablesDesignOptionsSchema)
  }
}

export default VariablesDesignOptionsRepository;
