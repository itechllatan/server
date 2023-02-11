import CommonRepository from './common';
import ProcessSchema from '../schemas/process';
import { getRepository, getConnection } from 'typeorm';

const id_risk_ = 'risk.id_risk';
const name_ = 'risk.name';
const description_ = 'risk.description';
const id_macroprocess_risk_ = 'macroprocessRisk.id_macroprocess_risk';
const id_macro_process_ = 'c.id_macro_process';

class ProcessRepository extends CommonRepository {
  constructor() {
    super(ProcessSchema);
    this.conn = getRepository(ProcessSchema)
  }

  async getAllProcessByMacro(id, query) {
    const search = query.search || '';
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 20;
    const pagination = query?.pagination || 1;
    const builder = await getConnection()
      .createQueryBuilder()
      .select([
        'process',
        'macroProcess',
        'typeProcess',
        'categoryProcess',
        'user',
      ])
      .from('process', 'process')
      .innerJoin('process.macroProcess', 'macroProcess')
      .innerJoin('process.typeProcess', 'typeProcess')
      .innerJoin('process.categoryProcess', 'categoryProcess')
      .innerJoin('process.user', 'user')
      .where('process.deleted_at is null')
      .andWhere('process.macroProcess = :id')
      .andWhere(`(upper(process.name) like :name OR 
                    upper(process.description) like :name)`)
      .setParameter('name', `%${(typeof search === 'string' ? search.toUpperCase() : '')}%`)
      .setParameter('id', id)
      .orderBy('process.id_process')
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

  async getProcessSocio(id) {
    const builder = getConnection()
      .createQueryBuilder()
      .select([id_risk_, name_, description_, id_macroprocess_risk_, id_macro_process_])
      .from('risk', 'risk')
      .leftJoin('risk.macroprocessRisk', 'macroprocessRisk')
      .leftJoin('macroprocessRisk.macroprocess', 'c', 'macroprocessRisk.macroprocess = :id')
      .setParameter('id', parseInt(id))
      .orderBy(id_macro_process_)
      .cache(true);
    return await builder.getMany();
  }



  /*
  async findAllBackOfficeProcess(query) {
    try {
      const page = query?.pagina || 1;
      const pageSize = query?.pageSize || 20;
      let builder = getConnection()
        .createQueryBuilder()
        .select([id_process_, nombre_, description_, evidencia_])
        .from('process', 'process')
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .cache(true);

      return await builder.getManyAndCount();
    } catch (e) {
      console.log(e);
    }
  }

  async findTypeProcess(data) {
    const builder = getConnection()
      .createQueryBuilder()
      .from('typeProcess', 'typeProcess')
      .select([
        id_type_process_,
        type_description_
      ])
      .where('typeProcess.id_type_process = :data')
      .setParameter('data', data);

    return await builder.getOne();
  }

  async findCategoryProcess(data) {
    const builder = getConnection()
      .createQueryBuilder()
      .from('categoryProcess', 'categoryProcess')
      .select([
        id_category_process_,
        category_description_
      ])
      .where('categoryProcess.id_category_process = :data')
      .setParameter('data', data);

    return await builder.getOne();
  }

  async findUser(data) {
    const builder = getConnection()
      .createQueryBuilder()
      .from('user', 'user')
      .select([
        id_user_,
        email_
      ])
      .where('user.id_user = :data')
      .setParameter('data', data);

    return await builder.getOne();
  }
  */
}

export default ProcessRepository;
