import LevelCriticalityColor from './level-criticality-color';
import UserProcess from './user-process';
import { validateIsNotNegativeValue, validateJustNumber, requiredParam } from '../../infrastructure/helpers/validations';

class LevelCriticality {
    constructor({
        id_level_criticality, // = requiredParam('id_level_criticality', language),
        name = requiredParam('name', language),
        weight = requiredParam('weight', language),
        percentage = requiredParam('percentage', language),
        levelCriticalityColor = requiredParam('levelCriticalityColor', language),
        user = requiredParam('user', language),
        language
    }) {
        validateJustNumber(id_level_criticality, 'id_level_criticality', language);
        validateIsNotNegativeValue(id_level_criticality, 'id_level_criticality', language);
        this.id_level_criticality = id_level_criticality;
        this.name = name;
        this.weight = weight;
        this.percentage = percentage;
        this.levelCriticalityColor = new LevelCriticalityColor({ validators: {}, ...levelCriticalityColor });
        this.user = new UserProcess({ validators: {}, ...user });
    }
}

export default LevelCriticality;