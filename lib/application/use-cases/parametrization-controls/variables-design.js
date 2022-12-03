import { getConnection } from "typeorm";
import VariablesDesign from "../../domain/variables-design";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class VariablesDesignUC {
  constructor({ variablesDesignRepository, variablesDesignOptionsRepository }) {
    this.variablesDesignRepository = variablesDesignRepository;
    this.variablesDesignOptionsRepository = variablesDesignOptionsRepository;
  }

  async getVariablesDesign() {
    return await this.variablesDesignRepository.findAll(
      {
        relations: ['user'],
        fields: ["id_variables_design", "name", "description", "weight", "user"],
        order: { id_variables_design: 'ASC' }
      }
    );
  }

  async getVariablesDesignOptions(id) {
    return await this.variablesDesignOptionsRepository.findAll(
      {
        relations: ['variablesDesign'],
        fields: ["id_variables_design_options", "name", "description", "weight", "toDefault", "variablesDesign"],
        where: { variablesDesign: id },
        order: { id_variables_design_options: 'ASC' }
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

export default VariablesDesignUC;
