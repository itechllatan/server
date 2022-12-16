
import {
    requiredParam
  } from '../../infrastructure/helpers/validations';

class Risk {
    constructor({
      id_risk,
      name = requiredParam('name', language),
      description = requiredParam('description', language),
      user,
    }) {
      this.id_risk = id_risk;
      this.name = name;
      this.description = description;
      this.user = user;
    }
  }
  
  export default Risk;