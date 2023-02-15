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
      return await this.processResponsibleRepository.delete(id);
    } catch (e) {
      throw new InvalidControl(e);
    }
  }

  async getProcessResponsibleByResponsible(id) {
    return await this.processResponsibleRepository.findAll({
      relations: ['process', 'responsibles'],
      fields: ["id_process_responsible"],
      where: { responsibles: id, deleted_at: null }
    });
  }
}

export default ProcessResponsibleUC;
