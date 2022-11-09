import CommonRepository from './common';
import TypeProcess from '../schemas/type-process'
import { getRepository } from 'typeorm';

class TypeProcessRepository extends CommonRepository {
  constructor() {
    super(TypeProcess);
    this.conn = getRepository(TypeProcess)
  }
}

export default TypeProcessRepository;
