import CommonRepository from './common';
import PlansActionSchema from '../schemas/plans-action'
import { getRepository, getConnection, getManager } from 'typeorm';

class PlansActionRepository extends CommonRepository {
  constructor() {
    super(PlansActionSchema);
    this.conn = getRepository(PlansActionSchema)
  }
  async getAllPlansAction(query) {
    const search = query.search || '';
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 20;
    const builder = await getConnection()
      .createQueryBuilder()
      .select([
        'plans_action',
        'responsibles',
      ])
      .from('plans_action', 'plans_action')
      .leftJoin('plans_action.responsibles', 'responsibles')
      .where('plans_action.deleted_at is null')
      .andWhere(`(upper(plans_action.name) like :name OR 
                  upper(plans_action.description) like :name)`)
      .setParameter('name', `%${(typeof search === 'string' ? search.toUpperCase() : '')}%`)
      .orderBy('plans_action.id_plans_action')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    builder[1] = {
      page,
      pageSize,
      //totalPages: parseInt(builder[1] / pageSize) + 1
      totalPages: Math.ceil(builder[1] / pageSize),
    }
    return builder
  }
}

export default PlansActionRepository;
