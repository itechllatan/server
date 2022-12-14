import { requiredParam } from '../../infrastructure/helpers/validations'
class VariableType{
    constructor({
        id_variable_type,
        description = requiredParam('description', language),
        rating_type = requiredParam('rating_type', language),
        language
    }) {
        this.id_variable_type = id_variable_type;
        this.description = description;
        this.rating_type = rating_type;
    }
}

export default VariableType;