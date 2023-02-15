import { getConnection } from "typeorm";
import PlansActionSubprocess from "../../domain/plans-action-subprocess";
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

class PlansActionSubprocessUC {
  constructor({ plansActionSubprocessRepository }) {
    this.plansActionSubprocessRepository = plansActionSubprocessRepository;
  }

  async getPlansActionSubprocessById(id) {
    return await this.plansActionSubprocessRepository.findAll({
      relations: ['plansAction', 'subprocess'],
      fields: ["id_plans_action_subprocess"],
      where: { plansAction: id, deleted_at: null }
    });
  }

  async savePlansActionSubprocess(Info, user) {
    Info.user = user.id_user;
    this.Info = new PlansActionSubprocess({
      validators: {},
      ...Info,
    });

    const saveInfo = await this.plansActionSubprocessRepository.save(this.Info);
    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    return {
      saveInfo,
    };
  }

  async deletePlansActionSubprocess(id, user) {
    try {
      return await this.plansActionSubprocessRepository.delete(id);
    } catch (e) {
      throw new InvalidControl(e);
    }
  }
}

export default PlansActionSubprocessUC;
