import { getConnection } from "typeorm";
import Process from '../../domain/process';
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { InvalidPropertyError } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class GetProcessUC {
  constructor({ processRepository }) {
    this.processRepository = processRepository;
  }

  async getProcess(language) {
    return await this.processRepository.findAll({
      relations: ['user', 'typeProcess', 'categoryProcess', 'macroProcess'],
      fields: ["created_at", "updated_at", "deleted_at", "id_process", "name", "description", "evidence", "user", "typeProcess", "categoryProcess", "macroProcess"],
      order: { id_process: 'ASC' },
      where: { deleted_at: null },
    });
  }

  async getProcessById(id) {
    return await this.processRepository.findAll({
      relations: ['user', 'typeProcess', 'categoryProcess', 'macroProcess'],
      fields: ["created_at", "updated_at", "deleted_at", "id_process", "name", "description", "evidence", "user", "typeProcess", "categoryProcess", "macroProcess"],
      where: { id_process: id, deleted_at: null },
    });
  }

  async saveProcess(Info, user, language) {
    const mess = language && language === 'en' ? message_en : message;
    Info.user = user.id_user;
    this.Info = new Process({
      validators: {},
      ...Info,
    });

    try {
      let saveInfo;
      await getConnection().transaction(async entityManager => {
        saveInfo = await this.processRepository.save(this.Info);
      })
      return {
        saveInfo,
      };
    } catch (e) {
      throw new InvalidPropertyError(e);
    }
  }

  async getProcessByMacro(id) {
    return await this.processRepository.findAll({
      relations: ['user', 'typeProcess', 'categoryProcess', 'macroProcess'],
      fields: ["id_process", "name", "description", "evidence", "user", "typeProcess", "categoryProcess", "macroProcess"],
      where: { macroProcess: id, deleted_at: null },
      order: { id_process: 'ASC' }
    });
  }

  async getProcessText(text) {
    try {
      let builder = getConnection()
        .createQueryBuilder()
        .select([
          'process',
          'typeProcess',
          'categoryProcess',
          'macroProcess',
          'user'
        ])
        .from('process', 'process')
        .leftJoin('process.typeProcess', 'typeProcess')
        .leftJoin('process.categoryProcess', 'categoryProcess')
        .leftJoin('process.macroProcess', 'macroProcess')
        .leftJoin('process.user', 'user')
        .andWhere(`(upper(process.name) like :text or 
                    upper(process.description) like :text) and
                   and deleted_at is null`)
        .setParameter('text', `%${text.toUpperCase()}%`)
        .cache(true);
      return await builder.getMany();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteProcess(id) {
    try {
      let updDelete;
      await getConnection().transaction(async entityManager => {
        updDelete =
          await this.processRepository.update(
            { id_process: id },
            { deleted_at: new Date() }
          );
      })

      return updDelete;
    } catch (e) {
      console.log('error', e)
      throw new InvalidControl(e);
    }
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
    const mess = language && language === 'en' ? message_en : message;
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
