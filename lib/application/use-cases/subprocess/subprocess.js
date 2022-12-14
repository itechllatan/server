import { getConnection } from "typeorm";
import Subprocess from '../../domain/subprocess';
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { InvalidPropertyError } from '../../../infrastructure/helpers/errors';

const message = messages.subprocess;
const message_en = messages_en.subprocess;

class SubprocessUC {
  constructor({ subprocessRepository }) {
    this.subprocessRepository = subprocessRepository;
  }

  async getSubprocess() {
    return await this.subprocessRepository.findAll({
      relations: ['user', 'typeProcess', 'categoryProcess', 'process'],
      fields: ["created_at", "updated_at", "deleted_at", "id_subprocess", "name", "description", "evidence", "user", "typeProcess", "categoryProcess", "process"],
      order: { id_subprocess: 'ASC' }
    });
  }

  async getSubprocessById(id) {
    return await this.subprocessRepository.findAll({
      relations: ['user', 'typeProcess', 'categoryProcess', 'process'],
      fields: ["created_at", "updated_at", "deleted_at", "id_subprocess", "name", "description", "evidence", "user", "typeProcess", "categoryProcess", "process"],
      where: { id_subprocess: id }
    });
  }

  async saveSubprocess(Info, language) {
    const mess = language && language === 'en' ? message_en : message;
    this.Info = new Subprocess({
      validators: {},
      ...Info,
    });

    try {
      let saveInfo;
      await getConnection().transaction(async entityManager => {
        saveInfo = await this.subprocessRepository.save(this.Info);
      })
      return {
        saveInfo,
      };
    } catch (e) {
      throw new InvalidPropertyError(e);
    }
  }

  async getSubprocessByProcess(id) {
    return await this.subprocessRepository.findAll({
      relations: ['user', 'typeProcess', 'categoryProcess', 'process'],
      fields: ["created_at", "updated_at", "deleted_at", "id_subprocess", "name", "description", "evidence", "user", "typeProcess", "categoryProcess", "process"],
      where: { process: id }
    });
  }
}

export default SubprocessUC;
