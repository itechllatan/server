import { getConnection } from "typeorm";
import VariablesDesign from "../../domain/variables-design";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class VariablesDesignUC {
  constructor({ variablesDesignRepository, variablesDesignOptionsRepository }) {
    this.variablesDesignRepository = variablesDesignRepository;
    this.variablesDesignOptionsRepository = variablesDesignOptionsRepository;
  }

  async getVariablesDesign() {
    try {
      const variablesDesign = await this.variablesDesignRepository.findAll({
        relations: ['user'],
        fields: ["id_variables_design", "name", "description", "weight", "user"],
        order: { id_variables_design: 'ASC' }
      });

      const variablesDesignoption = [];
      for (let i = 0; i < variablesDesign.length; i++) {
        const idVarDesign = variablesDesign[i].id_variables_design;
        const optionsDesign = await this.variablesDesignOptionsRepository.findAll({
          relations: ['variablesDesign'],
          fields: ["id_variables_design_options", "name", "description", "weight", "toDefault", "variablesDesign"],
          where: { variablesDesign: idVarDesign },
          order: { id_variables_design_options: 'ASC' }
        });
        variablesDesignoption.push(optionsDesign);
      };
      return [{
        variablesDesign,
        variablesDesignoption
      }];
    } catch (error) {
      console.log('error', error)
      throw new InvalidControl('Error en control', 'control');
    }
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
}

export default VariablesDesignUC;
