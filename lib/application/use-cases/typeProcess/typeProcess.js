//import Process from '../../domain/process';
//import config from '../../../infrastructure/config/env';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
//import bcrypt from 'bcryptjs';
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';

const message = messages.auth.sign_in;
const message_en = messages_en.auth.sign_in;

class GetTypeProcessUC {
  constructor({ typeProcessRepository, jwt }) {
    this.typeProcessRepository = typeProcessRepository;
    this.jwt = jwt;
  }

  async getTypeProcess(language) {
    const mess = language && language === 'en' ? message_en : message;
    const typeProcess = await this.typeProcessRepository.findAll(
      {
        fields: ["id_type_process", "description"],
      }
    );

    if (!typeProcess) {
      throw new UnauthorizedError(mess.no_process,
        'type process',
        'not exits');
    }

    return {
      typeProcess,
    };
  }

  async getTypeProcessById(typeProcessInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    
    const typeProcess = await this.typeProcessRepository.findAll(
      {
        fields: ["id_type_process", "description"],
        where: { id_type_process: typeProcessInfo.id }
      }
    );

    if (!typeProcess || typeProcess.length === 0) {
      throw new UnauthorizedError(mess.no_process,
        'type process',
        'not exits');
    }

    return {
      typeProcess,
    };
  }

}

export default GetTypeProcessUC;
