import Process from '../../domain/process';
import config from '../../../infrastructure/config/env';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import bcrypt from 'bcryptjs';
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';

const message = messages.auth.sign_in;
const message_en = messages_en.auth.sign_in;

class GetProcessUC {
  constructor({ processRepository, jwt }) {
    this.processRepository = processRepository;
    this.jwt = jwt;
  }

  async getProcess(language) {
    const mess = language && language === 'en' ? message_en : message;
    this.processInfo = new Process({
      validators: {},
    });

    const process = await this.processRepository.findAllBackOfficeProcess();
    console.log('process',process);
    
    if (!process) {
      throw new UnauthorizedError(mess.no_process,
        'process',
        'not exits');
    }

    return {
      process,
    };
  }
}

export default GetProcessUC;
