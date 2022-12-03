import UserProcess from './user-process';
import { validateIsNotNegativeValue, validateJustNumber, requiredParam } from '../../infrastructure/helpers/validations';

class VariablesContinuity {
    constructor({
        id_variables_continuity,
        name = requiredParam('name', language),
        description = requiredParam('description', language),
        weight = requiredParam('weight', language),
        user = requiredParam('user', language),
        language
    }) {
        validateJustNumber(id_variables_continuity, 'id_variables_continuity', language);
        validateIsNotNegativeValue(id_variables_continuity, 'id_variables_continuity', language);
        this.id_variables_continuity = id_variables_continuity;
        this.description = description;
        this.name = name;
        this.weight = weight;
        this.user = new UserProcess({ validators: {}, ...user });
    }
}

export default VariablesContinuity;