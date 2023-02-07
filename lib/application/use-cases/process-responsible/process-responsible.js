import { getConnection } from "typeorm";
import ProcessResponsible from "../../domain/process-responsible";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

class ProcessResponsibleUC {
  constructor({ processResponsibleRepository }) {
    this.processResponsibleRepository = processResponsibleRepository;
  }

  async getProcessResponsibleById(id) {
    return await this.processResponsibleRepository.findAll({
      relations: ['process', 'responsibles'],
      fields: ["id_process_responsible"],
      where: { process: id, deleted_at: null }
    });
  }

  async saveProcessResponsible(Info, user) {
    Info.user = user.id_user;
    this.Info = new ProcessResponsible({
      validators: {},
      ...Info,
    });

    const saveInfo = await this.processResponsibleRepository.save(this.Info);
    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    return {
      saveInfo,
    };
  }

  async deleteProcessResponsible(id, user) {
    try {
      let updDelete;
      await getConnection().transaction(async entityManager => {
        updDelete =
          await this.processResponsibleRepository.update(
            { id_process_responsible: id },
            { deleted_at: new Date(), deleted_by: user.id_user }
          );
      })

      return updDelete;
    } catch (e) {
      console.log('error', e)
      throw new InvalidControl(e);
    }
  }
}

export default ProcessResponsibleUC;
