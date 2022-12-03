import { getConnection } from "typeorm";
import VariablesCLevelC from "../../domain/variablesC-levelC";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, InvalidPropertyError } from '../../../infrastructure/helpers/errors';

class VariablesCLevelCUC {
  constructor({ variablesCLevelCRepository }) {
    this.variablesCLevelCRepository = variablesCLevelCRepository;
  }

  async getVariablesCLevelCById(variableInfo) {
    const level = await this.variablesCLevelCRepository.findAll({
      relations: ['levelCriticality', 'variablesContinuity'],
      fields: ['id_variablesC_levelC', 'description', 'levelCriticality', 'variablesContinuity'],
      where: { variablesContinuity: variableInfo.id },
      order: { variablesContinuity: 'ASC', id_variablesC_levelC: 'ASC' }
    });
    return level;
  }
}

export default VariablesCLevelCUC;