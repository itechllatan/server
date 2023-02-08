import CommonRepository from './common';
import CauseEffectSchema from '../schemas/cause-effect';
import { getRepository, getConnection } from 'typeorm';

class CauseEffectRepository extends CommonRepository {
  constructor() {
    super(CauseEffectSchema);
    this.conn = getRepository(CauseEffectSchema)
  }

  async getAllCauseEffect(query) {
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 20;
    const builder = await getConnection()
      .createQueryBuilder()
      .select([
        'cause_effect',
        'cause_effect_son',
        'cause_effect_root',
      ])
      .from('cause_effect', 'cause_effect')
      .leftJoin('cause_effect.cause_effect_son', 'cause_effect_son')
      .leftJoin('cause_effect_son.cause_effect_root', 'cause_effect_root')
      .where('cause_effect.deleted_at is null')
      .andWhere(`(upper(cause_effect.name) like :name OR 
                  upper(cause_effect.description) like :name)`)
      .setParameter('name', `%${query.search.toUpperCase()}%`)
      .orderBy('cause_effect.id_cause_effect')
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

export default CauseEffectRepository;
