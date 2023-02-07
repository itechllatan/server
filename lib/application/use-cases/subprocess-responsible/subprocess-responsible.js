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
      let updDelete;
      await getConnection().transaction(async entityManager => {
        updDelete =
          await this.subprocessResponsibleRepository.update(
            { id_subprocess_responsible: id },
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

export default SubprocessResponsibleUC;
