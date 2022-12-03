import {
    validateIsNotNegativeValue,
    validateJustNumber,
    requiredParam
} from '../../infrastructure/helpers/validations';

class UnitTime {
    constructor({ 
        id_unit_time = requiredParam('id_unit_time', language), 
        description, 
        language 
    }) {
        validateJustNumber(id_unit_time, 'id_unit_time', language);
        validateIsNotNegativeValue(id_unit_time, 'id_unit_time', language);
        this.id_unit_time = id_unit_time;
        this.description = description;
    }
}

export default UnitTime;