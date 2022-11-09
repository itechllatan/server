import {
    validateIsNotNegativeValue,
    validateJustNumber,
    requiredParam
  } from '../../infrastructure/helpers/validations';

class FrequencyRisk {
    constructor({ id_frequency_risk = requiredParam('id_frequency_risk', language), description, percentage, language}){
        validateJustNumber(id_frequency_risk, 'id_frequency_risk', language);
        validateIsNotNegativeValue(id_frequency_risk, 'id_frequency_risk', language);
        this.id_frequency_risk = id_frequency_risk;
        this.description = description;
        this.percentage = percentage;
    }
}

export default FrequencyRisk;