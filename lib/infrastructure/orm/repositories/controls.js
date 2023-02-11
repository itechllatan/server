import CommonRepository from './common';
import ControlsSchema from '../schemas/controls'
import { getRepository, getConnection, getManager } from 'typeorm';

class ControlsRepository extends CommonRepository {
  constructor() {
    super(ControlsSchema);
    this.conn = getRepository(ControlsSchema)
  }

  async getAllControls(query) {
    const search = query.search || '';
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 20;
    const builder = await getConnection()
      .createQueryBuilder()
      .select([
        'controls',
        'solidityGeneral',
        'solidityDesign',
        'solidityExecution',
        'user',
      ])
      .from('controls', 'controls')
      .leftJoin('controls.solidityGeneral', 'solidityGeneral')
      .leftJoin('controls.solidityDesign', 'solidityDesign')
      .leftJoin('controls.solidityExecution', 'solidityExecution')
      .leftJoin('controls.user', 'user')
      .where('controls.deleted_at is null')
      .andWhere(`(upper(controls.name) like :name OR 
                  upper(controls.description) like :name)`)
      .setParameter('name', `%${(typeof search === 'string' ? search.toUpperCase() : '')}%`)
      .orderBy('controls.id_controls')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    builder[1] = {
      page,
      pageSize,
      totalPages: parseInt(builder[1] / pageSize) + 1
    }
    return builder
  }
}

export default ControlsRepository;
