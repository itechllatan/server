import { getConnection } from "typeorm";
import ControlsResponsible from "../../domain/controls-responsible";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

class ControlsResponsibleUC {
  constructor({ controlsResponsibleRepository }) {
    this.controlsResponsibleRepository = controlsResponsibleRepository;
  }

  async getcontrolsResponsibleById(id) {
    return await this.controlsResponsibleRepository.findAll({
      relations: ['controls', 'responsibles'],
      fields: ["id_controls_responsible"],
      where: { controls: id, deleted_at: null }
    });
  }

  async saveControlsResponsible(Info, user) {
    Info.user = user.id_user;
    this.Info = new ControlsResponsible({
      validators: {},
      ...Info,
    });

    const saveInfo = await this.controlsResponsibleRepository.save(this.Info);
    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    return {
      saveInfo,
    };
  }

  async deleteControlsResponsible(id, user) {
    /*try {
      let updDelete;
      await getConnection().transaction(async entityManager => {
        updDelete =
          await this.controlsResponsibleRepository.update(
            { id_controls_responsible: id },
            { deleted_at: new Date(), deleted_by: user.id_user }
          );
      })

      return updDelete;
    } catch (e) {
      throw new InvalidControl(e);
    }*/

    try {
      return await this.controlsResponsibleRepository.delete(id);
    } catch (e) {
      throw new InvalidControl(e);
    }
  }

  async getcontrolsResponsibleByResponsible(id) {
    return await this.controlsResponsibleRepository.findAll({
      relations: ['controls', 'responsibles'],
      fields: ["id_controls_responsible"],
      where: { responsibles: id, deleted_at: null }
    });
  }
}

export default ControlsResponsibleUC;
