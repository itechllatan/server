import CommonRepository from './common';
import MacroProcessSchema from '../schemas/macro_process';
import { getRepository } from 'typeorm';

class MacroProcessRepository extends CommonRepository {
  constructor() {
    super(MacroProcessSchema);
    this.conn = getRepository(MacroProcessSchema)
  }
}

export default MacroProcessRepository;
