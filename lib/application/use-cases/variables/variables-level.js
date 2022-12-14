import { getConnection } from "typeorm";
import VariablesLevel from "../../domain/variables-level";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, InvalidPropertyError } from '../../../infrastructure/helpers/errors';

class VariablesLevelUC {
  constructor({ variablesLevelRepository }) {
    this.variablesLevelRepository = variablesLevelRepository;
  }

  async getVariablesLevelById(id) {
    return await this.variablesLevelRepository.findAll({
      relations: ['levelCriticality', 'variables'],
      fields: ['id_variables_level', 'description', 'levelCriticality', 'variables'],
      where: { variables: id },
      order: { variables: 'ASC', id_variables_level: 'ASC' }
    });
  }
}

export default VariablesLevelUC;