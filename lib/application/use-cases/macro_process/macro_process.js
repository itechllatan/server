import { getConnection } from "typeorm";
import MacroProcess from '../../domain/macro_process'
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';

const message = messages.macro_process.save;
const message_en = messages_en.macro_process.save;

class MacroProcessUC {
  constructor({ macroProcessRepository }) {
    this.macroProcessRepository = macroProcessRepository;
  }

  async getMacroProcess(language) {
    const mess = language && language === 'en' ? message_en : message;
    const macroprocess = await this.macroProcessRepository.findAll(
      {
        relations: ['user', 'typeProcess', 'categoryProcess'],
        fields: ["created_at", "updated_at", "deleted_at", "id_macro_process", "name", "description", "evidence", "user", "typeProcess", "categoryProcess"],
        order: {
          id_macro_process: 'ASC'
        }
      }
    );

    if (!macroprocess) {
      throw new UnauthorizedError(mess.no_macro_process,
        'process',
        'not exits');
    }

    return {
      macroprocess,
    };
  }

  async getMacroProcessById(macroProcessInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    const macroprocess = await this.macroProcessRepository.findAll(
      {
        relations: ['user', 'typeProcess', 'categoryProcess'],
        fields: ["created_at", "updated_at", "deleted_at", "id_macro_process", "name", "description", "evidence", "user", "typeProcess", "categoryProcess"],
        where: { id_macro_process: macroProcessInfo.id }
      }
    );

    if (!macroprocess) {
      throw new UnauthorizedError(mess.no_macro_process,
        'process',
        'not exits');
    }

    return {
      macroprocess,
    };
  }

  async saveMacroProcess(macroProcessInfo, language) {
    const mess = language && language === 'en' ? message_en : message;
    this.macroProcessInfo = new MacroProcess({
      validators: {},
      ...macroProcessInfo,
    });

    try {
      let saveMacroProcess;

      await getConnection().transaction(async entityManager => {
        saveMacroProcess = await this.macroProcessRepository.save(this.macroProcessInfo);
      })
      return {
        saveMacroProcess,
      };
    } catch (e) {
      throw new InvalidPropertyError(e);
    }
  }
}

export default MacroProcessUC;
