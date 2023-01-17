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

  async getProcessRiskByProcess(id, language) {
    const mess = language && language === 'en' ? message_en : message;

    return await this.processRiskRepository.findAll({
      relations: ['process', 'risk_heat_map', 'risk_heat_map.risk'
        , 'risk_heat_map.inherentRisk', 'risk_heat_map.inherentRisk.riskLevel'
        , 'risk_heat_map.residualRisk', 'risk_heat_map.residualRisk.riskLevel'
      ],
      fields: ["id_process_risk"],
      where: { process: id }
    });
  }

  async saveProcessRisk(info, user, language) {
    const mess = language && language === 'en' ? message_en : message;
    info.user = user.id_user;
    this.info = new ProcessRisk({
      validators: {},
      ...info,
    });

    const saveInfo = await this.processRiskRepository.save(this.info);
    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    return {
      saveInfo,
    };
  }
}

export default ProcessRiskUC;
