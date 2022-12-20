import UserProcess from './user-process';
import { validateIsNotNegativeValue, validateJustNumber, requiredParam } from '../../infrastructure/helpers/validations';

class LevelCriticality {
    constructor({
        id_level_criticality, // = requiredParam('id_level_criticality', language),
        name = requiredParam('name', language),
        weight = requiredParam('weight', language),
        percentage = requiredParam('percentage', language),
        color = requiredParam('color', language),
        user = requiredParam('user', language),
        language
    }) {
        validateJustNumber(id_level_criticality, 'id_level_criticality', language);
        validateIsNotNegativeValue(id_level_criticality, 'id_level_criticality', language);
        this.id_level_criticality = id_level_criticality;
        this.name = name;
        this.weight = weight;
        this.percentage = percentage;
        this.color = color;
        this.user = user;
    }
}

export default LevelCriticality;