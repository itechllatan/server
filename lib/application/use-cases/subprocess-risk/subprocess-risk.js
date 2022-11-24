import { getConnection } from "typeorm";
import SubprocessRisk from "../../domain/subprocess-risk";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class SubprocessRiskUC {
  constructor({ subprocessRiskRepository }) {
    this.subprocessRiskRepository = subprocessRiskRepository;
  }

  async getSubprocessRisk(language) {
    const mess = language && language === 'en' ? message_en : message;
    return await this.subprocessRiskRepository.findAll(
      {
        relations: ['subprocess', 'risk', 'user'],
        fields: ["created_at", "updated_at", "deleted_at", "id_subprocess_risk", "subprocess", "risk", "user"],
        order: {
          id_subprocess_risk: 'ASC'
        }
      }
    );

  }

  async getSubprocessRiskById(processInfo, language) {
    const mess = language && language === 'en' ? message_en : message;

    return await this.subprocessRiskRepository.findAll({
      relations: ['subprocess', 'risk', 'user'],
      fields: ["created_at", "updated_at", "deleted_at", "id_subprocess_risk", "subprocess", "risk", "user"],
      where: { subprocess: processInfo.id }
    });
  }

  async saveSubprocessRisk(processInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    this.processInfo = new SubprocessRisk({
      validators: {},
      ...processInfo,
    });

    try {
      let saveSubprocessRisk;
      await getConnection().transaction(async entityManager => {
        saveSubprocessRisk = await this.subprocessRiskRepository.save(this.processInfo);
      })
      return {
        saveSubprocessRisk,
      };
    } catch (e) {
      throw new InvalidPropertyError(e);
    }
  }
}

export default SubprocessRiskUC;
