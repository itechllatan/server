import { getConnection } from "typeorm";
import MacroprocessRisk from "../../domain/macroprocess-risk";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';

const message = messages.macro_process;
const message_en = messages_en.macro_process;

class MacroprocessRiskUC {
  constructor({ macroprocessRiskRepository }) {
    this.macroprocessRiskRepository = macroprocessRiskRepository;
  }

  async getMacroProcessRisk(language) {
    const mess = language && language === 'en' ? message_en : message;
    return await this.macroprocessRiskRepository.findAll(
      {
        relations: ['macroprocess', 'risk', 'user'],
        fields: ["created_at", "updated_at", "deleted_at", "id_macroprocess_risk", "macroprocess", "risk", "user"],
        order: {
          id_macroprocess_risk: 'ASC'
        }
      }
    );

  }

  async getMacroprocessRiskById(id) {
    return await this.macroprocessRiskRepository.findAll({
      relations: ['macroprocess', 'risk'],
      fields: ["id_macroprocess_risk", "macroprocess", "risk"],
      where: { macroprocess: id }
    });
  }

  async saveMacroprocessRisk(processInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    this.processInfo = new MacroprocessRisk({
      validators: {},
      ...processInfo,
    });
    
    const saveMacroprocessRisk = await this.macroprocessRiskRepository.save(this.processInfo);
    if (!saveMacroprocessRisk || saveMacroprocessRisk.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    return {
      saveMacroprocessRisk,
    };
    /*  
    try {
      let saveMacroprocessRisk;
      await getConnection().transaction(async entityManager => {
        saveMacroprocessRisk = await this.macroprocessRiskRepository.save(this.processInfo);
      })
      return {
        saveMacroprocessRisk,
      };
    } catch (e) {
      throw new InvalidPropertyError(e);
    }
    */
  }
}

export default MacroprocessRiskUC;
