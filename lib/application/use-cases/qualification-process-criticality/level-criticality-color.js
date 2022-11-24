import { getConnection } from "typeorm";
import LevelCriticalityColor from "../../domain/level-criticality-color";

class LevelCriticalityColorUC {
  constructor({ levelCriticalityColorRepository }) {
    this.levelCriticalityColorRepository = levelCriticalityColorRepository;
  }

  async getLevelCriticalityColor() {
    return await this.levelCriticalityColorRepository.findAll(
      {
        fields: ['id_level_criticality_color','color'],
        order: { id_level_criticality_color: 'ASC' }
      }
    );
  }
}

export default LevelCriticalityColorUC;