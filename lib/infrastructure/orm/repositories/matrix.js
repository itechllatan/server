import CommonRepository from './common';
import MatrixSchema from '../schemas/matrix';
import { getRepository } from 'typeorm';

class MatrixRepository extends CommonRepository {
  constructor() {
    super(MatrixSchema);
    this.conn = getRepository(MatrixSchema)
  }
}

export default MatrixRepository;
