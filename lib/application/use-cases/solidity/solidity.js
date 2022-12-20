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
        fields: ["id_solidity", "name", "description", "weight_since", "weight_until", "color"],
        order: { id_solidity: 'ASC' }
      }
    );
  }

  async saveSolidity(Info, language) {
    const mess = language && language === 'en' ? message_en : message;
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
}

export default SolidityUC;
