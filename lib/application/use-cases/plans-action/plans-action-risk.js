import PlansActionRisk from '../../domain/plans-action-risk';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { getConnection } from "typeorm";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';


const message = messages.plansAction;
const message_en = messages_en.plansAction;

class PlansActionRiskUC {
  constructor({ plansActionRiskRepository }) {
    this.plansActionRiskRepository = plansActionRiskRepository;
  }

  async getPlansActionRiskById(id, language) {
    const mess = language && language === 'en' ? message_en : message;

    return await this.plansActionRiskRepository.findAll({
      relations: ['plansAction', 'risk'],
      fields: ["id_plans_action_risk", "plansAction", "risk"],
      where: { plansAction: id }
    });
  }

  async savePlansActionRisk(info, language) {
    const mess = language && language === 'en' ? message_en : message;

    this.info = new PlansActionRisk({
      validators: {},
      ...info,
    });

    const saveInfo = await this.plansActionRiskRepository.save(this.info);
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

export default PlansActionRiskUC;
