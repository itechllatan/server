import CommonRepository from './common';
import LevelCriticalityColorSchema from '../schemas/level-criticality-color'
import { getRepository, getConnection } from 'typeorm';

const id_level_criticality_color_ = 'levelCriticalityColor.id_level_criticality_color';
const color_ = 'levelCriticalityColor.color';
const id_level_criticality_ = 'levelCriticality.id_level_criticality';

class LevelCriticalityColorRepository extends CommonRepository {
  constructor() {
    super(LevelCriticalityColorSchema);
    this.conn = getRepository(LevelCriticalityColorSchema)
  }

  async getLevelCriticalityColor() {
    const builder = getConnection()
                    .createQueryBuilder()
                    .select([
id_level_criticality_color_,
color_,
id_level_criticality_
                    ])
                    .from('level_criticality_color', 'levelCriticalityColor')
                    .leftJoin('levelCriticalityColor.levelCriticality', 'levelCriticality')                    
                    // .from('level_criticality', 'levelCriticality')
                    // .leftJoin('levelCriticality.levelCriticalityColor', 'levelCriticalityColor')
                    .cache(true);
    return await builder.getMany();
  }
}

export default LevelCriticalityColorRepository;