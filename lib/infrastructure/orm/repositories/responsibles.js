import CommonRepository from './common';
import ResponsiblesSchema from '../schemas/responsibles'
import { getRepository, getConnection, getManager } from 'typeorm';

class ResponsiblesRepository extends CommonRepository {
  constructor() {
    super(ResponsiblesSchema);
    this.conn = getRepository(ResponsiblesSchema)
  }
  async getAllResponsibles(query) {
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 20;
    const builder = await getConnection()
      .createQueryBuilder()
      .select([
        'responsibles',
      ])
      .from('responsibles', 'responsibles')
      .where('responsibles.deleted_at is null')
      .andWhere(`(upper(responsibles.document_number) like :name OR 
                  upper(responsibles.names) like :name OR 
                  upper(responsibles.last_name_1) like :name OR 
                  upper(responsibles.last_name_2) like :name)`)
      .setParameter('name', `%${query.search.toUpperCase()}%`)
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    builder[1] = {
      page,
      pageSize,
      totalPages: parseInt(builder[1] / 20) + 1
    }
    return builder
  }
}

export default ResponsiblesRepository;
