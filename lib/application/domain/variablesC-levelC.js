import { validateIsNotNegativeValue, validateJustNumber, requiredParam } from '../../infrastructure/helpers/validations';
import UserProcess from './user-process';
import VariablesContinuity from './variables-continuity_id';
import LevelCriticality from './level-criticality_id';

class VariablesCLevelC {
    constructor({
        id_variablesC_levelC,
        variablesContinuity = requiredParam('variablesContinuity', language),
        levelCriticality = requiredParam('levelCriticality', language),
        user = requiredParam('user', language),
        description,
        language
    }) {
        validateJustNumber(id_variablesC_levelC, 'id_variablesC_levelC', language);
        validateIsNotNegativeValue(id_variablesC_levelC, 'id_variablesC_levelC', language);
        this.id_variablesC_levelC = id_variablesC_levelC;
        this.description = description;
        this.variablesContinuity = new VariablesContinuity({ validators: {}, ...variablesContinuity });
        this.levelCriticality = new LevelCriticality({ validators: {}, ...levelCriticality });
        this.user = new UserProcess({ validators: {}, ...user });
    }
}

export default VariablesCLevelC;