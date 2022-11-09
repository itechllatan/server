import CommonRepository from './common';
import ProcessSchema from '../schemas/process';
import { getConnection, getRepository } from 'typeorm';

const id_process_ = 'process.id_process';
const nombre_ = 'process.nombre';
const evidencia_ = 'process.evidencia';
const description_ = 'process.description';
const created_at_ = 'process.created_at';
const deleted_at_ = 'process.deleted_at';

const id_type_process_ = 'typeProcess.id_type_process';
const type_description_ = 'typeProcess.description';

const id_category_process_ = 'categoryProcess.id_category_process';
const category_description_ = 'categoryProcess.description';

const id_user_ = 'user.id_user';
const email_ = 'user.email';

class ProcessRepository extends CommonRepository {
  constructor() {
    super(ProcessSchema);
    this.conn = getRepository(ProcessSchema)
  }

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
}

export default ProcessRepository;
