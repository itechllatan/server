import { getConnection } from "typeorm";
import Process from '../../domain/process';
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class GetProcessUC {
  constructor({ processRepository }) {
    this.processRepository = processRepository;
  }

  async getProcess(language) {
    const mess = language && language === 'en' ? message_en : message;
    const process = await this.processRepository.findAll(
      {
        relations: ['user', 'typeProcess', 'categoryProcess', 'macroProcess'],
        fields: ["created_at", "updated_at", "deleted_at", "id_process", "name", "description", "evidence", "user", "typeProcess", "categoryProcess", "macroProcess"],
        order: {
          id_process: 'ASC'
        }
      }
    );

    if (!process) {
      throw new UnauthorizedError(mess.find.not,
        'process',
        'not exits');
    }

    return {
      process,
    };
  }

  async getProcessById(processInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    const process = await this.processRepository.findAll(
      {
        relations: ['user', 'typeProcess', 'categoryProcess', 'macroProcess'],
        fields: ["created_at", "updated_at", "deleted_at", "id_process", "name", "description", "evidence", "user", "typeProcess", "categoryProcess", "macroProcess"],
        where: { id_process: processInfo.id }
      }
    );

    if (!process || process.length === 0) {
      throw new UnauthorizedError(mess.find.not,
        'process',
        'not exits');
    }

    return {
      process,
    };
  }

  async saveProcess(processInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    this.processInfo = new Process({
      validators: {},
      ...processInfo,
    });

    try {
      let saveProcess;
      await getConnection().transaction(async entityManager => {
        saveProcess = await this.processRepository.save(this.processInfo);
      })
      return {
        saveProcess,
      };
    } catch (e) {
      throw new InvalidPropertyError(e);
    }
  }

  async getProcessByMacro(processInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    const process = await this.processRepository.findAll(
      {
        relations: ['user', 'typeProcess', 'categoryProcess', 'macroProcess'],
        fields: ["created_at", "updated_at", "deleted_at", "id_process", "name", "description", "evidence", "user", "typeProcess", "categoryProcess", "macroProcess"],
        where: { macroProcess : processInfo.id }
      }
    );

    if (!process || process.length === 0) {
      throw new UnauthorizedError(mess.find.not,
        'process',
        'not exits');
    }

    return {
      process,
    };
  }
  /*
    async getProcess(language) {
    const mess = language && language === 'en' ? message_en : message;
    const process = await this.processRepository.findAll(
      {
        relations: ['user', 'typeProcess', 'categoryProcess'],
        fields: ["created_at", "updated_at", "deleted_at", "id_process", "name", "description", "evidence", "user", "typeProcess", "categoryProcess"],
        order: {
          id_process: 'ASC'
        }
      }
    );

    if (!process) {
      throw new UnauthorizedError(mess.no_process,
        'process',
        'not exits');
    }

    return {
      process,
    };
  }

  async getProcessById(processInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    const process = await this.processRepository.findAll(
      {
        relations: ['user', 'typeProcess', 'categoryProcess'],
        fields: ["created_at", "updated_at", "deleted_at", "id_process", "name", "description", "evidence", "user", "typeProcess", "categoryProcess"],
        where: { id_process: processInfo.id }
      }
    );

    if (!process || process.length === 0) {
      throw new UnauthorizedError(mess.no_process,
        'process',
        'not exits');
    }

    return {
      process,
    };
  }

  async saveProcess(processInfo, language) {
    //console.log('datos 2:',name, evidence,  typeProcess, categoryProcess, user);
    const mess = language && language === 'en' ? message_en : message;
    console.log('processInfo 1', processInfo);
    this.processInfo = new Process({
      validators: {},
      ...processInfo,
    });

    const type = await this.processRepository.findTypeProcess(this.processInfo.typeProcess.id_type_process);
    if (!type) {
      throw new UnauthorizedError(mess.no_type,
        'Type process',
        'incorrect');
    }

    const category = await this.processRepository.findCategoryProcess(this.processInfo.categoryProcess.id_category_process);
    if (!category) {
      throw new UnauthorizedError(mess.no_category,
        'Category process',
        'incorrect');
    }

    const user = await this.processRepository.findUser(this.processInfo.user.id_user);
    if (!user) {
      throw new UnauthorizedError(mess.no_user,
        'Category process',
        'incorrect');
    }

    const process = await this.processRepository.save(this.processInfo);
    if (!process || process.length === 0) {
      throw new UnauthorizedError(mess.no_process,
        'process',
        'not exits');
    }

    return {
      process,
    };
  }*/
}

export default GetProcessUC;
