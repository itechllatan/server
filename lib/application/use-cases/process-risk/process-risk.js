import { getConnection } from "typeorm";
import ProcessRisk from "../../domain/process-risk";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class ProcessRiskUC {
  constructor({ processRiskRepository }) {
    this.processRiskRepository = processRiskRepository;
  }

  async getProcessRisk(language) {
    const mess = language && language === 'en' ? message_en : message;
    const process_risk = await this.processRiskRepository.findAll(
      {
        relations: ['process', 'risk', 'user'],
        fields: ["created_at", "updated_at", "deleted_at", "id_process_risk", "process", "risk", "user"],
        order: {
          id_process_risk: 'ASC'
        }
      }
    );

    if (!process_risk) {
      throw new UnauthorizedError(mess.find.not,
        'process',
        'not exits');
    }

    return {
      process_risk,
    };
  }

  async getProcessRiskByProcess(processInfo, language) {
    const mess = language && language === 'en' ? message_en : message;

    return await this.processRiskRepository.findAll({
      relations: ['risk',],
      fields: ["id_process_risk", "risk"],
      where: { process: processInfo.id }
    });
  }

  async saveProcessRisk(processInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    this.processInfo = new ProcessRisk({
      validators: {},
      ...processInfo,
    });

    try {
      let saveProcessRisk;
      await getConnection().transaction(async entityManager => {
        saveProcessRisk = await this.processRiskRepository.save(this.processInfo);
      })
      return {
        saveProcessRisk,
      };
    } catch (e) {
      throw new InvalidPropertyError(e);
    }
  }
}

export default ProcessRiskUC;
