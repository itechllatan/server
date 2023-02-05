import { getConnection } from "typeorm";
import CriticalityLevel from "../../domain/criticality-level";
import { ForbiddenError, UnauthorizedError, InvalidPropertyError } from '../../../infrastructure/helpers/errors';

class CriticalityLevelUC {
  constructor({ criticalityLevelRepository }) {
    this.criticalityLevelRepository = criticalityLevelRepository;
  }

  async getCriticalityLevel() {
    return await this.criticalityLevelRepository.findAll(
      {
        relations: ['user'],
        fields: ['id_criticality_level', 'name', 'weight', 'color', 'percentage', 'enable'],
        order: { id_criticality_level: 'ASC' },
        where: { deleted_at: null }
      }
    );
  }

  async saveCriticalityLevel(newLevel, language) {
    this.level = new CriticalityLevel({
      validators: {},
      ...newLevel
    })
    try {
      let savedLevel;
      await getConnection()
        .transaction(async entityManager => {
          savedLevel = await this.criticalityLevelRepository.save(this.level);
        })
      return {
        level: savedLevel,
      }
    } catch (err) {
      throw new InvalidPropertyError(err);
    }
  }
}

export default CriticalityLevelUC;