import { validateIsNotNegativeValue, validateJustNumber, requiredParam } from '../../infrastructure/helpers/validations';

class CriticalityLevel {
    constructor({
        id_criticality_level, // = requiredParam('id_criticality_level', language),
        name = requiredParam('name', language),
        weight = requiredParam('weight', language),
        percentage = requiredParam('percentage', language),
        color = requiredParam('color', language),
        user = requiredParam('user', language),
        language
    }) {
        validateJustNumber(id_criticality_level, 'id_criticality_level', language);
        validateIsNotNegativeValue(id_criticality_level, 'id_criticality_level', language);
        this.id_criticality_level = id_criticality_level;
        this.name = name;
        this.weight = weight;
        this.percentage = percentage;
        this.color = color;
        this.user = user;
    }
}

export default CriticalityLevel;