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
      let updDelete;
      await getConnection().transaction(async entityManager => {
        updDelete =
          await this.plansActionSubprocessRepository.update(
            { id_plans_action_subprocess: id },
            { deleted_at: new Date(), deleted_by: user.id_user }
          );
      })

      return updDelete;
    } catch (e) {
      throw new InvalidControl(e);
    }
  }
}

export default PlansActionSubprocessUC;
