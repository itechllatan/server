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
        order: { id_subprocess_risk: 'ASC' },
        where: { deleted_at: null }
      }
    );

  }

  async getSubprocessRiskById(id, language) {
    const mess = language && language === 'en' ? message_en : message;

    return await this.subprocessRiskRepository.findAll({
      relations: ['subprocess', 'risk_heat_map', 'risk_heat_map.risk'
        , 'risk_heat_map.inherentRisk', 'risk_heat_map.inherentRisk.riskLevel'
        , 'risk_heat_map.residualRisk', 'risk_heat_map.residualRisk.riskLevel'
      ],
      fields: ["id_subprocess_risk"],
      where: { subprocess: id, deleted_at: null }
    });
  }

  async getRiskSubprocessById(id) {
    return await this.subprocessRiskRepository.findAll({
      relations: ['subprocess', 'risk_heat_map', 'risk_heat_map.risk'
        , 'risk_heat_map.inherentRisk', 'risk_heat_map.inherentRisk.riskLevel'
        , 'risk_heat_map.residualRisk', 'risk_heat_map.residualRisk.riskLevel'
      ],
      fields: ["id_subprocess_risk"],
      where: { risk_heat_map: id, deleted_at: null }
    });
  }

  async saveSubprocessRisk(info, user, language) {
    const mess = language && language === 'en' ? message_en : message;
    info.user = user.id_user;
    this.info = new SubprocessRisk({
      validators: {},
      ...info,
    });

    const saveInfo = await this.subprocessRiskRepository.save(this.info);
    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    return {
      saveInfo,
    };
  }

  async deleteSubprocessRisk(id) {
    try {
      let updDelete;
      await getConnection().transaction(async entityManager => {
        updDelete =
          await this.subprocessRiskRepository.update(
            { id_subprocess_risk: id },
            { deleted_at: new Date() }
          );
      })

      return updDelete;
    } catch (e) {
      console.log('error', e)
      throw new InvalidControl(e);
    }
  }
}

export default SubprocessRiskUC;
