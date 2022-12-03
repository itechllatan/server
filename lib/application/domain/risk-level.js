  import {
    requiredParam
  } from '../../infrastructure/helpers/validations';

class RiskLevel {
    constructor({ 
        id_risk_level,
        name = requiredParam('name', language), 
        description = requiredParam('description', language), 
        color = requiredParam('color', language), heatMap, language}){
        this.id_risk_level = id_risk_level;
        this.name = name;
        this.description = description;
        this.color = color;
        this.heatMap = heatMap;
    }
}

export default RiskLevel;