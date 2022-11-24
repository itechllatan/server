import { validateIsNotNegativeValue, validateJustNumber, requiredParam } from '../../infrastructure/helpers/validations';

class LevelCriticalityColor {
    constructor({
        id_level_criticality_color,
        color,
        language
    }) {
        this.id_level_criticality_color = id_level_criticality_color;
        this.color = color;
    }
}

export default LevelCriticalityColor;