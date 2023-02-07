import { getConnection } from "typeorm";
import MacroprocessResponsible from "../../domain/macroprocess-responsible";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

const message = messages.macro_process;
const message_en = messages_en.macro_process;

class MacroprocessResponsibleUC {
  constructor({ macroprocessResponsibleRepository }) {
    this.macroprocessResponsibleRepository = macroprocessResponsibleRepository;
  }

  async getMacroprocessResponsibleById(id) {
    return await this.macroprocessResponsibleRepository.findAll({
      relations: ['macroprocess', 'responsibles'],
      fields: ["id_macroprocess_responsible"],
      where: { macroprocess: id, deleted_at: null }
    });
  }

  async saveMacroprocessResponsible(processInfo, user) {
    processInfo.user = user.id_user;
    this.processInfo = new MacroprocessResponsible({
      validators: {},
      ...processInfo,
    });

    const saveInfo = await this.macroprocessResponsibleRepository.save(this.processInfo);
    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    return {
      saveInfo,
    };
  }

  async deleteMacroprocessResponsible(id, user) {
    try {
      let updDelete;
      await getConnection().transaction(async entityManager => {
        updDelete =
          await this.macroprocessResponsibleRepository.update(
            { id_macroprocess_responsible: id },
            { deleted_at: new Date(), deleted_by: user.id_user }
          );
      })

      // return updDelete;
      return { message: "Updated successfully" }
    } catch (e) {
      throw new InvalidControl(e);
    }
  }
}

export default MacroprocessResponsibleUC;
