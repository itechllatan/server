import { getConnection } from "typeorm";
import MacroProcess from '../../domain/macro_process'
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl, InvalidPropertyError } from '../../../infrastructure/helpers/errors';

const message = messages.macro_process.save;
const message_en = messages_en.macro_process.save;

class MacroProcessUC {
  constructor({ macroProcessRepository }) {
    this.macroProcessRepository = macroProcessRepository;
  }

  async getMacroProcess() {
    return await this.macroProcessRepository.findAll(
      {
        relations: ['user', 'typeProcess', 'categoryProcess'],
        fields: ["created_at", "updated_at", "deleted_at", "id_macro_process", "name", "description", "evidence", "user", "typeProcess", "categoryProcess"],
        order: { id_macro_process: 'ASC' }
      }
    );
  }

  async getMacroProcessById(id, language) {
    try {
      return await this.macroProcessRepository.findAll({
        relations: ['user', 'typeProcess', 'categoryProcess'],
        fields: ["created_at", "updated_at", "deleted_at", "id_macro_process", "name", "description", "evidence", "user", "typeProcess", "categoryProcess"],
        where: { id_macro_process: id }
      });
    } catch (error) {
      console.log('error', error)
      throw new InvalidControl('Error en control', 'control');
    }
  }

  async saveMacroProcess(macroProcessInfo, user, language) {
    const mess = language && language === 'en' ? message_en : message;
    macroProcessInfo.user = user.id_user;
    this.macroProcessInfo = new MacroProcess({
      validators: {},
      ...macroProcessInfo,
    });

    try {
      let saveInfo;

      await getConnection().transaction(async entityManager => {
        saveInfo = await this.macroProcessRepository.save(this.macroProcessInfo);
      })
      return {
        saveInfo,
      };
    } catch (e) {
      throw new InvalidPropertyError(e);
    }
  }
}

export default MacroProcessUC;
