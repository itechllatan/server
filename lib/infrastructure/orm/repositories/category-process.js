import CommonRepository from './common';
import CategoryProcess from '../schemas/category-process'
import { getRepository } from 'typeorm';

class CategoryProcessRepository extends CommonRepository {
  constructor() {
    super(CategoryProcess);
    this.conn = getRepository(CategoryProcess)
  }
}

export default CategoryProcessRepository;
