import { getConnection } from "typeorm";
import PlansActionMacroProcess from "../../domain/plans-action-macroprocess";
import { UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

class PlansActionMacroProcessUC {
  constructor({ plansActionMacroProcessRepository }) {
    this.plansActionMacroProcessRepository = plansActionMacroProcessRepository;
  }

  async getPlansActionMacroProcessById(id) {
    return await this.plansActionMacroProcessRepository.findAll({
      relations: ['plansAction', 'macroprocess'],
      fields: ["id_plans_action_macrop"],
      where: { plansAction: id, deleted_at: null }
    });
  }

  async savePlansActionMacroProcess(Info, user) {
    Info.user = user.id_user;
    this.Info = new PlansActionMacroProcess({
      validators: {},
      ...Info,
    });

    const saveInfo = await this.plansActionMacroProcessRepository.save(this.Info);
    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    return {
      saveInfo,
    };
  }

  async deletePlansActionMacroProcess(id, user) {
    try {
      let updDelete;
      await getConnection().transaction(async entityManager => {
        updDelete =
          await this.plansActionMacroProcessRepository.update(
            { id_plans_action_macrop: id },
            { deleted_at: new Date(), deleted_by: user.id_user }
          );
      })

      return updDelete;
    } catch (e) {
      throw new InvalidControl(e);
    }
  }
}

export default PlansActionMacroProcessUC;
