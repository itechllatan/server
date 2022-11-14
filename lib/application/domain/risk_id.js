
import {requiredParam} from '../../infrastructure/helpers/validations';

class Risk {
  constructor({
    id_risk = requiredParam('id_risk', language),
  }) {
    this.id_risk = id_risk;
  }
}

export default Risk;