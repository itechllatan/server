import CommonRepository from './common';
import ProcessSchema from '../schemas/process';
import { getConnection, getRepository } from 'typeorm';

const id_process_ = 'process.id_process';
const nombre_ = 'process.nombre';
const evidencia_ = 'process.evidencia';
const created_at_ = 'process.created_at';
const deleted_at_ = 'process.deleted_at';


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
        .select([id_process_, nombre_, evidencia_])
        .from('process', 'process')
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .cache(true);

      // if (query && Object.keys(query).length !== 0) {
      //   builder = await this.filterProcessByQuery(builder, query);
      // } else {
      //   builder = builder.orderBy(created_at_, 'DESC');
      // }

      const temp = await builder.getManyAndCount();
      console.log(temp);

      return await builder.getManyAndCount();
    } catch (e) {
      console.log(e);
    }

  }
  async filterProcessByQuery(builder, query) {
    if (query.rol) {
      const rols = query.rol.split(',');
      builder = builder.andWhere('authority.label in (:rols)',
        {
          rols,
        }
      );
    }

    let order = 'DESC';
    if (query.created_first) {
      order = 'ASC';
    }
    if (query.created_last) {
      order = 'DESC';
    }

    builder = builder.addOrderBy(created_at_,
      order);

    if (query.user_active) {
      builder = builder.andWhere('user.deleted_at is null');
    }

    if (query.user_inactive) {
      builder = builder.andWhere('user.deleted_at is not null');
    }

    if (query.email_user) {
      builder = builder.andWhere('user.email like :email_user',
        {
          email_user: `%${query.email_user}%`,
        });
    }

    return builder;
  }

  async findProcessById() {
    const builder = getConnection()
      .createQueryBuilder()
      .select([
        id_process_,
        nombre_,
        evidencia_,
        created_at_,
        deleted_at_,
      ])
      .from('process', 'process')
      .cache(true);

    return await builder.getAll();

  }

}

export default ProcessRepository;
