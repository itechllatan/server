import CommonRepository from './common';
import MacroprocessRiskSchema from '../schemas/macroprocess-risk'
import { getRepository, getConnection } from 'typeorm';

class MacroprocessRiskRepository extends CommonRepository {
  constructor() {
    super(MacroprocessRiskSchema);
    this.conn = getRepository(MacroprocessRiskSchema)
  }

  async findRisk(id) {
    try {
      let builder = getConnection()
        .createQueryBuilder()
        .select(['risk.id_risk'])
        .from('risk', 'risk')
        .where('risk.id_risk = :id')
        .setParameter('id', id)
        .cache(true);

      return await builder.getOne();
    } catch (e) {
      console.log(e);
    }
  }

  async findMacro(id) {
    try {
      let builder = getConnection()
        .createQueryBuilder()
        .select(['macro_process.id_macro_process'])
        .from('macro_process', 'macro_process')
        .where('macro_process.id_macro_process = :id')
        .setParameter('id', id)
        .cache(true);

      return await builder.getOne();
    } catch (e) {
      console.log(e);
    }
  }
}

export default MacroprocessRiskRepository;
