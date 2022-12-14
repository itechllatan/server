import ControlsRisk from '../../domain/controls-risk';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { getConnection } from "typeorm";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';

const message = messages.macro_process;
const message_en = messages_en.macro_process;

class ControlsRiskUC {
  constructor({ controlsRiskRepository }) {
    this.controlsRiskRepository = controlsRiskRepository;
  }

  async getControlsRiskById(id, language) {
    const mess = language && language === 'en' ? message_en : message;

    return await this.controlsRiskRepository.findAll({
      relations: ['controls', 'risk'],
      fields: ["id_controls_risk", "controls", "risk"],
      where: { controls: id }
    });
  }

  async saveControlsRisk(info, language) {
    const mess = language && language === 'en' ? message_en : message;
    this.info = new ControlsRisk({
      validators: {},
      ...info,
    });

    const saveInfo = await this.controlsRiskRepository.save(this.info);
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

export default ControlsRiskUC;
