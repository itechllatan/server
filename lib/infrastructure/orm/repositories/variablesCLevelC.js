import CommonRepository from './common';
import VariablesCLevelCSchema from '../schemas/variablesC-levelC';
import { getConnection, getRepository } from 'typeorm';

class VariablesCLevelCRepository extends CommonRepository {
  constructor() {
    super(VariablesCLevelCSchema);
    this.conn = getRepository(VariablesCLevelCSchema)
  }

  async getVariablesCLevelC_2(info) {
    const builder = getConnection()
      .createQueryBuilder()
      .select(['variablesCLevelC.id_variablesC_levelC', 'variablesContinuity.id_variables_continuity', 'levelCriticality.id_level_criticality'])
      .from('variablesCLevelC', 'variablesCLevelC')
      .innerJoin('variablesCLevelC.variablesContinuity', 'variablesContinuity')
      .innerJoin('variablesCLevelC.levelCriticality', 'levelCriticality')
      .where('variablesCLevelC.variablesContinuity = :id')
      .setParameter('id', parseInt(info.id))
      .orderBy('variablesCLevelC.levelCriticality')
      .cache(true);
    return await builder.getMany();
  }
}

export default VariablesCLevelCRepository;