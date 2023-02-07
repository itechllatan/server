import CommonRepository from './common';
import MacroprocessResponsibleSchema from '../schemas/macroprocess-responsible'
import { getRepository, getConnection } from 'typeorm';

class MacroprocessResponsibleRepository extends CommonRepository {
  constructor() {
    super(MacroprocessResponsibleSchema);
    this.conn = getRepository(MacroprocessResponsibleSchema)
  }
}

export default MacroprocessResponsibleRepository;
