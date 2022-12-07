import { getConnection } from "typeorm";
import Solidity from "../../domain/solidity";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class SolidityUC {
  constructor({ solidityRepository }) {
    this.solidityRepository = solidityRepository;
  }

  async getSolidity() {
    return await this.solidityRepository.findAll(
      {
        relations: ['levelCriticalityColor', 'user'],
        fields: ["id_solidity", "name", "description", "weight_since", "weight_until", "levelCriticalityColor", "user"],
        order: { id_solidity: 'ASC' }
      }
    );
  }

  /*
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
        where: { macroProcess: processInfo.id }
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
  */
}

export default SolidityUC;
