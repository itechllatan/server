import CommonRepository from './common';
import MacroProcessSchema from '../schemas/macro_process';
import { getRepository, getConnection } from 'typeorm';

class MacroProcessRepository extends CommonRepository {
  constructor() {
    super(MacroProcessSchema);
    this.conn = getRepository(MacroProcessSchema)
  }

  async getAllMacroProcess(query) {
    const search = query.search || '';
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 20;
    const pagination = query?.pagination || 1;
    const builder = await getConnection()
      .createQueryBuilder()
      .select([
        'macro_process',
        'typeProcess',
        'categoryProcess',
        'user',
      ])
      .from('macro_process', 'macro_process')
      .leftJoin('macro_process.typeProcess', 'typeProcess')
      .leftJoin('macro_process.categoryProcess', 'categoryProcess')
      .leftJoin('macro_process.user', 'user')
      .where('macro_process.deleted_at is null')
      .andWhere(`(upper(macro_process.name) like :name OR 
                  upper(macro_process.description) like :name)`)
      .setParameter('name', `%${(typeof search === 'string' ? search.toUpperCase() : '')}%`)
      .orderBy('macro_process.id_macro_process')
      .skip((pagination == 1 && ((page - 1) * pageSize)))
      .take((pagination == 1 && pageSize))
      .getManyAndCount();

    builder[1] = {
      page,
      pageSize,
      totalPages: parseInt(builder[1] / pageSize) + 1
    }
    return builder
  }
}

export default MacroProcessRepository;
