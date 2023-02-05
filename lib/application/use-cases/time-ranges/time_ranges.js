import { getConnection } from "typeorm";
import TimeRanges from "../../domain/time-ranges";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, InvalidPropertyError } from '../../../infrastructure/helpers/errors';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class TimeRangesUC {
  constructor({ timeRangesRepository }) {
    this.timeRangesRepository = timeRangesRepository;
  }

  async getTimeRanges() {
    return await this.timeRangesRepository.findAll(
      {
        relations: ['unitTime', 'criticalityLevel', 'user'],
        fields: ['id_time_ranges', 'since', 'until', 'enable'],
        order: { id_time_ranges: 'ASC' },
        where: { deleted_at: null }
      }
    );
  }

  async saveTimeRanges(Info, language) {
    const mess = language && language === 'en' ? message_en : message;
    this.Info = new TimeRanges({
      validators: {},
      ...Info,
    });

    try {
      let saveInfo;
      await getConnection().transaction(async entityManager => {
        saveInfo = await this.timeRangesRepository.save(this.Info);
      })
      return {
        saveInfo,
      };
    } catch (e) {
      console.log('error', e)
      throw new InvalidControl(e);
    }
  }
}

export default TimeRangesUC;