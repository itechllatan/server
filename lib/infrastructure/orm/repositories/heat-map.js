import CommonRepository from './common';
import HeatMapSchema from '../schemas/heat-map';
import { getRepository } from 'typeorm';

class HeatMapRepository extends CommonRepository {
  constructor() {
    super(HeatMapSchema);
    this.conn = getRepository(HeatMapSchema)
  }
}

export default HeatMapRepository;
