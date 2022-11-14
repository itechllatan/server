import { getConnection } from "typeorm";
import Subprocess from '../../domain/subprocess';
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';

const message = messages.subprocess;
const message_en = messages_en.subprocess;

class SubprocessUC {
  constructor({ subprocessRepository }) {
    this.subprocessRepository = subprocessRepository;
  }

  async getSubprocess(language) {
    const mess = language && language === 'en' ? message_en : message;
    const subprocess = await this.subprocessRepository.findAll(
      {
        relations: ['user', 'typeProcess', 'categoryProcess', 'process'],
        fields: ["created_at", "updated_at", "deleted_at", "id_subprocess", "name", "description", "evidence", "user", "typeProcess", "categoryProcess", "process"],
        order: {
          id_subprocess: 'ASC'
        }
      }
    );

    if (!subprocess) {
      throw new UnauthorizedError(mess.find.not,
        'subprocess',
        'not exits');
    }

    return {
      subprocess,
    };
  }

  async getSubprocessById(processInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    const subprocess = await this.subprocessRepository.findAll(
      {
        relations: ['user', 'typeProcess', 'categoryProcess', 'process'],
        fields: ["created_at", "updated_at", "deleted_at", "id_subprocess", "name", "description", "evidence", "user", "typeProcess", "categoryProcess", "process"],
        where: { id_subprocess: processInfo.id }
      }
    );

    if (!subprocess || process.length === 0) {
      throw new UnauthorizedError(mess.find.not,
        'subprocess',
        'not exits');
    }

    return {
      subprocess,
    };
  }

  async saveSubprocess(processInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    this.processInfo = new Subprocess({
      validators: {},
      ...processInfo,
    });

    try {
      let saveSubprocess;
      await getConnection().transaction(async entityManager => {
        saveSubprocess = await this.subprocessRepository.save(this.processInfo);
      })
      return {
        saveSubprocess,
      };
    } catch (e) {
      throw new InvalidPropertyError(e);
    }
  }

  async getSubprocessByProcess(processInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    const subprocess = await this.subprocessRepository.findAll(
      {
        relations: ['user', 'typeProcess', 'categoryProcess', 'process'],
        fields: ["created_at", "updated_at", "deleted_at", "id_subprocess", "name", "description", "evidence", "user", "typeProcess", "categoryProcess", "process"],
        where: { process : processInfo.id }
      }
    );

    if (!subprocess || subprocess.length === 0) {
      throw new UnauthorizedError(mess.find.not,
        'subprocess',
        'not exits');
    }

    return {
      subprocess,
    };
  }
}

export default SubprocessUC;
