import { validateIsNotNegativeValue, validateJustNumber, requiredParam } from '../../infrastructure/helpers/validations';
import Variables from './variables_id'
import LevelCriticality from './level-criticality_id';

class VariablesLevel {
    constructor({
        id_variables_level,
        description,
        variables = requiredParam('variables', language),
        levelCriticality = requiredParam('levelCriticality', language),
        user = requiredParam('user', language),
        language
    }) {
        validateJustNumber(id_variables_level, 'id_variables_level', language);
        validateIsNotNegativeValue(id_variables_level, 'id_variables_level', language);
        this.id_variables_level = id_variables_level;
        this.description = description;
        this.variables = new Variables({ validators: {}, ...variables });
        this.levelCriticality = new LevelCriticality({ validators: {}, ...levelCriticality });
        this.user = user;
    }
}

export default VariablesLevel;