import { getConnection } from "typeorm";
import Solidity from "../../domain/solidity";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { InvalidPropertyError } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class SolidityUC {
  constructor({ solidityRepository }) {
    this.solidityRepository = solidityRepository;
  }

  async getSolidity() {
    return await this.solidityRepository.findAll(
      {
        fields: ["id_solidity", "name", "description", "weight_since", "weight_until", "color", "per_assigned_frequency", "per_assigned_impact"],
        order: { id_solidity: 'ASC' },
        where: { deleted_at: null }
      }
    );
  }

  async saveSolidity(Info, user, language) {
    const mess = language && language === 'en' ? message_en : message;
    Info.user = user.id_user;
    this.solidityInfo = new Solidity({
      validators: {},
      ...Info,
    });

    try {
      let saveInfo;
      await getConnection().transaction(async entityManager => {
        saveInfo = await this.solidityRepository.save(this.solidityInfo);
      })
      return {
        saveInfo,
      };
    } catch (e) {
      console.log('error', e)
      throw new InvalidPropertyError(e);
    }
  }

  async deleteSolidity(id, user) {
    try {
      let updDelete;
      await getConnection().transaction(async entityManager => {
        updDelete =
          await this.solidityRepository.update(
            { id_solidity: id },
            { deleted_at: new Date(), deleted_by: user.id_user }
          );
      })

      return updDelete;
    } catch (e) {
      throw new InvalidControl(e);
    }
  }
}

export default SolidityUC;
