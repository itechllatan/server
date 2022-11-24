import { getConnection } from "typeorm";
import VariablesContinuity from "../../domain/variables-continuity";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, InvalidPropertyError } from '../../../infrastructure/helpers/errors';

//const message = messages.process;
//const message_en = messages_en.process;

class VariablesContinuityUC {
  constructor({ variablesContinuityRepository }) {
    this.variablesContinuityRepository = variablesContinuityRepository;
  }

  async getVariablesContinuity() {
    return await this.variablesContinuityRepository.findAll(
      {
        relations: ['user'],
        fields: ['id_variables_continuity', 'name', 'weight', 'user'],
        order: { id_variables_continuity: 'ASC' }
      }
    );
  }

  async saveVariablesContinuity(newVariableCon, language) {
    this.VariableCon = new VariablesContinuity({
      validators: {},
      ...newVariableCon
    })
    try {
      let savedVariableCon;
      await getConnection()
        .transaction(async entityManager => {
          savedVariableCon = await this.variablesContinuityRepository.save(this.VariableCon);
        })
      return {
        VariableCon: savedVariableCon,
      }
    } catch (err) {
      throw new InvalidPropertyError(err);
    }
  }
}

export default VariablesContinuityUC;