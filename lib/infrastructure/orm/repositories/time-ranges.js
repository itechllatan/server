import CommonRepository from './common';
import TimeRangesSchema from '../schemas/time-ranges';
import { getRepository } from 'typeorm';

class TimeRangesRepository extends CommonRepository {
  constructor() {
    super(TimeRangesSchema);
    this.conn = getRepository(TimeRangesSchema)
  }
}

export default TimeRangesRepository;