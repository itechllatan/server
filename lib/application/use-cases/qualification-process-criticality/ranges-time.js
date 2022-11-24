import { getConnection } from "typeorm";
import RangesTime from "../../domain/ranges-time";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, InvalidPropertyError } from '../../../infrastructure/helpers/errors';

//const message = messages.process;
//const message_en = messages_en.process;

class RangesTimeUC {
  constructor({ rangesTimeRepository }) {
    this.rangesTimeRepository = rangesTimeRepository;
  }

  async getRangesTime() {
    return await this.rangesTimeRepository.findAll(
      {
        relations: ['user'],
        fields: ['id_ranges_time', 'since', 'until', 'unit_measurement', 'level_criticality', 'percentage', 'user'],
        order: { id_ranges_time: 'ASC' }
      }
    );
  }

  async saveRangesTime(newRange, language) {
    this.range = new RangesTime({
      validators: {},
      ...newRange
    })
    try {
      let savedRange;
      await getConnection()
        .transaction(async entityManager => {
          savedRange = await this.rangesTimeRepository.save(this.range);
        })
      return {
        range: savedRange,
      }
    } catch (err) {
      throw new InvalidPropertyError(err);
    }
  }
}

export default RangesTimeUC;