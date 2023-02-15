import { getConnection } from "typeorm";
import PlansActionProcess from "../../domain/plans-action-process";
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

class PlansActionProcessUC {
  constructor({ plansActionProcessRepository }) {
    this.plansActionProcessRepository = plansActionProcessRepository;
  }

  async getPlansActionProcessById(id) {
    return await this.plansActionProcessRepository.findAll({
      relations: ['plansAction', 'process'],
      fields: ["id_plans_action_process"],
      where: { plansAction: id, deleted_at: null }
    });
  }

  async savePlansActionProcess(Info, user) {
    Info.user = user.id_user;
    this.Info = new PlansActionProcess({
      validators: {},
      ...Info,
    });

    const saveInfo = await this.plansActionProcessRepository.save(this.Info);
    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    return {
      saveInfo,
    };
  }

  async deletePlansActionProcess(id, user) {
    try {
      return await this.plansActionProcessRepository.delete(id);
    } catch (e) {
      throw new InvalidControl(e);
    }
  }
}

export default PlansActionProcessUC;
