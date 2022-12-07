import CommonRepository from './common';
import SoliditySchema from '../schemas/solidity'
import { getRepository } from 'typeorm';

class SolidityRepository extends CommonRepository {
  constructor() {
    super(SoliditySchema);
    this.conn = getRepository(SoliditySchema)
  }
}

export default SolidityRepository;
