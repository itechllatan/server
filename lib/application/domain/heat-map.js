import {
    requiredParam
  } from '../../infrastructure/helpers/validations';

class HeatMap {
    constructor({ 
        name = requiredParam('name', language), 
        description = requiredParam('description', language), user, language}){
        this.name = name;
        this.description = description;
        this.user = user;
    }
}

export default HeatMap;