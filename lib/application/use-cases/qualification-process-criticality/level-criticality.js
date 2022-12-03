import { getConnection } from "typeorm";
import LevelCriticality from "../../domain/level-criticality";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, InvalidPropertyError } from '../../../infrastructure/helpers/errors';

//const message = messages.process;
//const message_en = messages_en.process;

class LevelCriticalityUC {
  constructor({ levelCriticalityRepository }) {
    this.levelCriticalityRepository = levelCriticalityRepository;
  }

  async getLevelCriticality() {
    return await this.levelCriticalityRepository.findAll(
      {
        relations: ['levelCriticalityColor', 'user'],
        fields: ['id_level_criticality', 'name', 'weight', 'levelCriticalityColor', 'percentage', 'user','enable'],
        order: { id_level_criticality: 'ASC' }
      }
    );
  }

  async saveLevelCriticality(newLevel, language) {
    this.level = new LevelCriticality({
      validators: {},
      ...newLevel
    })
    try {
      console.log('level',this.level)
      let savedLevel;
      await getConnection()
        .transaction(async entityManager => {
          savedLevel = await this.levelCriticalityRepository.save(this.level);
        })
      return {
        level: savedLevel,
      }
    } catch (err) {
      throw new InvalidPropertyError(err);
    }
  }
}

export default LevelCriticalityUC;