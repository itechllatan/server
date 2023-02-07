import PlansActionRisk from '../../domain/plans-action-risk';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { getConnection } from "typeorm";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';


const message = messages.plansAction;
const message_en = messages_en.plansAction;

class PlansActionRiskUC {
  constructor({ plansActionRiskRepository }) {
    this.plansActionRiskRepository = plansActionRiskRepository;
  }

  async getPlansActionRiskById(id, language) {
    const mess = language && language === 'en' ? message_en : message;

    return await this.plansActionRiskRepository.findAll({
      relations: ['plansAction', 'risk_heat_map', 'risk_heat_map.risk'
        , 'risk_heat_map.inherentRisk', 'risk_heat_map.inherentRisk.riskLevel'
        , 'risk_heat_map.residualRisk', 'risk_heat_map.residualRisk.riskLevel'
      ],

      fields: ["id_plans_action_risk"],
      where: { plansAction: id, deleted_at: null }
    });
  }

  async savePlansActionRisk(info, user, language) {
    const mess = language && language === 'en' ? message_en : message;
    info.user = user.id_user;
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
    }
  }

  async deletePlansActionRisk(id) {
    try {
      let updDelete;
      await getConnection().transaction(async entityManager => {
        updDelete =
          await this.plansActionRiskRepository.update(
            { id_plans_action_risk: id },
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

export default PlansActionRiskUC;
