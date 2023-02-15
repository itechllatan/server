import { getConnection } from "typeorm";
import SubprocessResponsible from "../../domain/subprocess-responsible";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

class SubprocessResponsibleUC {
  constructor({ subprocessResponsibleRepository }) {
    this.subprocessResponsibleRepository = subprocessResponsibleRepository;
  }

  async getSubprocessResponsibleById(id) {
    return await this.subprocessResponsibleRepository.findAll({
      relations: ['subprocess', 'responsibles'],
      fields: ["id_subprocess_responsible"],
      where: { subprocess: id, deleted_at: null }
    });
  }

  async saveSubprocessResponsible(Info, user) {
    Info.user = user.id_user;
    this.Info = new SubprocessResponsible({
      validators: {},
      ...Info,
    });

    const saveInfo = await this.subprocessResponsibleRepository.save(this.Info);
    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    return {
      saveInfo,
    };
  }

  async deleteSubprocessResponsible(id, user) {
    try {
      return await this.subprocessResponsibleRepository.delete(id);
    } catch (e) {
      throw new InvalidControl(e);
    }
  }

  async getSubprocessResponsibleByResponsible(id) {
    return await this.subprocessResponsibleRepository.findAll({
      relations: ['subprocess', 'responsibles'],
      fields: ["id_subprocess_responsible"],
      where: { responsibles: id, deleted_at: null }
    });
  }
}

export default SubprocessResponsibleUC;
