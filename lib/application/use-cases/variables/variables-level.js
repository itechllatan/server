import { getConnection } from "typeorm";
import VariablesLevel from "../../domain/variables-level";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, InvalidPropertyError } from '../../../infrastructure/helpers/errors';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class VariablesLevelUC {
  constructor({ variablesLevelRepository }) {
    this.variablesLevelRepository = variablesLevelRepository;
  }

  async getVariablesLevelById(id) {
    return await this.variablesLevelRepository.findAll({
      relations: ['criticalityLevel', 'variables', 'user'],
      fields: ['id_variables_level', 'description', 'criticalityLevel', 'variables'],
      where: { variables: id, deleted_at: null },
      order: { criticalityLevel: 'ASC' }
    });
  }

  async saveVariablesLevel(Info, language) {
    const mess = language && language === 'en' ? message_en : message;
    this.Info = new VariablesLevel({
      validators: {},
      ...Info,
    });

    try {
      let saveInfo;
      await getConnection().transaction(async entityManager => {
        saveInfo = await this.variablesLevelRepository.save(this.Info);
      })
      return {
        saveInfo,
      };
    } catch (e) {
      console.log('error', e)
      throw new InvalidControl(e);
    }
  }
}

export default VariablesLevelUC;