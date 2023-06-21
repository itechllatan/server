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

  async getMacroProcess(query) {
    return await this.macroProcessRepository.getAllMacroProcess(query);
  }

  async getMacroProcessById(id, language) {
    try {
      return await this.macroProcessRepository.findAll({
        relations: ['user', 'typeProcess', 'categoryProcess'],
        fields: ["created_at", "updated_at", "deleted_at", "id_macro_process", "name", "description", "evidence", "user", "typeProcess", "categoryProcess"],
        where: { id_macro_process: id, deleted_at: null },
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

  async getMacroProcessText(text) {
    try {
      let builder = getConnection()
        .createQueryBuilder()
        .select([
          'macro_process',
          'typeProcess',
          'categoryProcess',
          'user'
        ])
        .from('macro_process', 'macro_process')
        .leftJoin('macro_process.typeProcess', 'typeProcess')
        .leftJoin('macro_process.categoryProcess', 'categoryProcess')
        .leftJoin('macro_process.user', 'user')
        .andWhere(`(upper(macro_process.name) like :text or 
                    upper(macro_process.description) like :text) and
                    "macro_process".deleted_at is null
                  `)
        .setParameter('text', `%${text.toUpperCase()}%`)
        .cache(true);
      return await builder.getMany();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteMacroProcess(id, user) {
    try {
      let updDelete;
      await getConnection().transaction(async entityManager => {
        updDelete =
          await this.macroProcessRepository.update(
            { id_macro_process: id },
            { deleted_at: new Date(), deleted_by: user.id_user }
          );
      })
      console.log('updDelete,updDelete', updDelete);
      return updDelete;
    } catch (e) {
      console.log('error', e)
      throw new InvalidControl(e);
    }
  }
}

export default MacroProcessUC;
