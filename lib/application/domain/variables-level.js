import { validateIsNotNegativeValue, validateJustNumber, requiredParam } from '../../infrastructure/helpers/validations';
import Variables from './variables_id'
import CriticalityLevel from './criticality-level_id';

class VariablesLevel {
    constructor({
        id_variables_level,
        description,
        variables = requiredParam('variables', language),
        criticalityLevel = requiredParam('criticalityLevel', language),
        user = requiredParam('user', language),
        language
    }) {
        validateJustNumber(id_variables_level, 'id_variables_level', language);
        validateIsNotNegativeValue(id_variables_level, 'id_variables_level', language);
        this.id_variables_level = id_variables_level;
        this.description = description;
        this.variables = new Variables({ validators: {}, ...variables });
        this.criticalityLevel = new CriticalityLevel({ validators: {}, ...criticalityLevel });
        this.user = user;
    }
}

export default VariablesLevel;