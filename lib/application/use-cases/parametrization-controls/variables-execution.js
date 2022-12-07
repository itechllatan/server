import { getConnection } from "typeorm";
import VariablesExecution from "../../domain/variables-execution";
import VariablesExecutionOptions from "../../domain/variables-execution-options";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class VariablesExecutionUC {
  constructor({ variablesExecutionRepository, variablesExecutionOptionsRepository }) {
    this.variablesExecutionRepository = variablesExecutionRepository;
    this.variablesExecutionOptionsRepository = variablesExecutionOptionsRepository;
  }

  async getVariablesExecution() {
    try {
      const variablesExecution = await this.variablesExecutionRepository.findAll({
        relations: ['user'],
        fields: ["id_variables_execution", "name", "description", "weight", "user"],
        order: { id_variables_execution: 'ASC' }
      });

      const variablesExecutionOption = [];

      for (let i = 0; i < variablesExecution.length; i++) {
        const idVarExecution = variablesExecution[i].id_variables_execution;
        const optionsExecution = await this.variablesExecutionOptionsRepository.findAll({
          relations: ['variablesExecution'],
          fields: ["id_variables_execution_options", "name", "description", "weight", "toDefault", "variablesExecution"],
          where: { variablesExecution: idVarExecution },
          order: { id_variables_execution_options: 'ASC' }
        });
        variablesExecutionOption.push(optionsExecution);
      };

      return [{
        variablesExecution,
        variablesExecutionOption
      }];
    } catch (error) {
      console.log('error', error)
      throw new InvalidControl('Error en control', 'control');
    }
  }

  async getVariablesExecutionOptions(id) {
    return await this.variablesExecutionOptionsRepository.findAll(
      {
        relations: ['variablesExecution'],
        fields: ["id_variables_execution_options", "name", "description", "weight", "toDefault", "variablesExecution"],
        where: { variablesExecution: id },
        order: { id_variables_execution_options: 'ASC' }
      }
    );
  }
}

export default VariablesExecutionUC;
