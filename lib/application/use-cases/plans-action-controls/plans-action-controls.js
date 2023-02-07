import { getConnection } from "typeorm";
import PlansActionControls from "../../domain/plans-action-controls";
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

class PlansActionControlsUC {
  constructor({ plansActionControlsRepository }) {
    this.plansActionControlsRepository = plansActionControlsRepository;
  }

  async getPlansActionControlsById(id) {
    return await this.plansActionControlsRepository.findAll({
      relations: ['plansAction', 'controls', 'controls.solidityGeneral', 'controls.solidityDesign', 'controls.solidityExecution'],
      fields: ["id_plans_action_controls"],
      where: { plansAction: id, deleted_at: null }
    });
  }

  async savePlansActionControls(Info, user) {
    Info.user = user.id_user;
    this.Info = new PlansActionControls({
      validators: {},
      ...Info,
    });

    const saveInfo = await this.plansActionControlsRepository.save(this.Info);
    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    return {
      saveInfo,
    };
  }

  async deletePlansActionControls(id, user) {
    try {
      let updDelete;
      await getConnection().transaction(async entityManager => {
        updDelete =
          await this.plansActionControlsRepository.update(
            { id_plans_action_controls: id },
            { deleted_at: new Date(), deleted_by: user.id_user }
          );
      })

      return updDelete;
    } catch (e) {
      throw new InvalidControl(e);
    }
  }
}

export default PlansActionControlsUC;
