import CommonRepository from './common';
import SubprocessSchema from '../schemas/subprocess';
import { getRepository, getConnection } from 'typeorm';

class ProcessRepository extends CommonRepository {
  constructor() {
    super(SubprocessSchema);
    this.conn = getRepository(SubprocessSchema)
  }

  async getAllSubprocessByProcess(id, query) {
    const search = query.search || '';
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 20;
    const pagination = query?.pagination || 1;
    const builder = await getConnection()
      .createQueryBuilder()
      .select([
        'subprocess',
        'typeProcess',
        'categoryProcess',
        'process',
        'user',
      ])
      .from('subprocess', 'subprocess')
      .innerJoin('subprocess.typeProcess', 'typeProcess')
      .innerJoin('subprocess.categoryProcess', 'categoryProcess')
      .innerJoin('subprocess.process', 'process')
      .innerJoin('subprocess.user', 'user')
      .where('subprocess.deleted_at is null')
      .andWhere('subprocess.process = :id')
      .andWhere(`(upper(subprocess.name) like :name OR 
                      upper(subprocess.description) like :name)`)
      .setParameter('name', `%${(typeof search === 'string' ? search.toUpperCase() : '')}%`)
      .setParameter('id', id)
      .orderBy('subprocess.id_subprocess')
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

export default ProcessRepository;
