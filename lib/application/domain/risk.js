
import {
    requiredParam
  } from '../../infrastructure/helpers/validations';

class Risk {
    constructor({
      id_risk,
      name = requiredParam('name', language),
      reference,
      description,
      user,
    }) {
      this.id_risk = id_risk;
      this.name = name;
      this.description = description;
      this.user = user;
      this.reference = reference;
    }
  }
  
  export default Risk;