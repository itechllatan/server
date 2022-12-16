import { requiredParam } from '../../infrastructure/helpers/validations'
class Variable{
    constructor({
        id_variable,
        name = requiredParam('name', language),
        description = requiredParam('description', language),
        weight = requiredParam('weight', language),
        user,
        variable_type = requiredParam('variable_type', language),
        language
    }) {
        this.id_variable = id_variable;
        this.name = name;
        this.description = description;
        this.weight = weight;
        this.user = user;
        this.variable_type = variable_type;
    }
}

export default Variable;