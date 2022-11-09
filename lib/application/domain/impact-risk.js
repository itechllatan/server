import {
    validateIsNotNegativeValue,
    validateJustNumber,
    requiredParam
  } from '../../infrastructure/helpers/validations';

class ImpactRisk {
    constructor({ id_impact_risk = requiredParam('id_impact_risk', language), description, percentage, language}){
        validateJustNumber(id_impact_risk, 'id_impact_risk', language);
        validateIsNotNegativeValue(id_impact_risk, 'id_impact_risk', language);
        this.id_impact_risk = id_impact_risk;
        this.description = description;
        this.percentage = percentage;
    }
}

export default ImpactRisk;