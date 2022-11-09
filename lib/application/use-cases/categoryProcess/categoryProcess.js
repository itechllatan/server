//import Process from '../../domain/process';
//import config from '../../../infrastructure/config/env';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
//import bcrypt from 'bcryptjs';
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';

const message = messages.auth.sign_in;
const message_en = messages_en.auth.sign_in;

class GetCategoryProcessUC {
  constructor({ categoryProcessRepository, jwt }) {
    this.categoryProcessRepository = categoryProcessRepository;
    this.jwt = jwt;
  }

  async getCategoryProcess(language) {
    const mess = language && language === 'en' ? message_en : message;
    const categoryProcess = await this.categoryProcessRepository.findAll(
      {
        fields: ["id_category_process", "description"],
      }
    );

    if (!categoryProcess) {
      throw new UnauthorizedError(mess.no_process,
        'category process',
        'not exits');
    }

    return {
      categoryProcess,
    };
  }

  async getCategoryProcessById(categoryProcessInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    const categoryProcess = await this.categoryProcessRepository.findAll(
      {
        fields: ["id_category_process", "description"],
        where: { id_category_process: categoryProcessInfo.id }
      }
    );

    if (!categoryProcess || categoryProcess.length === 0) {
      throw new UnauthorizedError(mess.no_process,
        'category process',
        'not exits');
    }

    return {
      categoryProcess,
    };
  }
}

export default GetCategoryProcessUC;
