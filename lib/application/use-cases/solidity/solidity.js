import { getConnection } from "typeorm";
import Solidity from "../../domain/solidity";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';

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
}

export default SolidityUC;
