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

  async saveSubprocess(Info, user, language) {
    const mess = language && language === 'en' ? message_en : message;
    Info.user = user.id_user;
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
      fields: ["id_subprocess", "name", "description", "evidence", "user", "typeProcess", "categoryProcess", "process"],
      where: { process: id },
      order: { id_subprocess: 'ASC' }
    });
  }

  async getSubprocessText(text) {
    try {
      let builder = getConnection()
        .createQueryBuilder()
        .select([
          'subprocess',
          'typeProcess',
          'categoryProcess',
          'process',
          'user'
        ])
        .from('subprocess', 'subprocess')
        .leftJoin('subprocess.typeProcess', 'typeProcess')
        .leftJoin('subprocess.categoryProcess', 'categoryProcess')
        .leftJoin('subprocess.process', 'process')
        .leftJoin('subprocess.user', 'user')
        .andWhere(`(subprocess.name like :text 
                or subprocess.description like :text)`)
        .setParameter('text', `%${text}%`)
        .cache(true);
      return await builder.getMany();
    } catch (e) {
      console.log(e);
    }
  }
}

export default SubprocessUC;
