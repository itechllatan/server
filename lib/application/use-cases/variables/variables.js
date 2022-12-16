import { InvalidControl } from '../../../infrastructure/helpers/errors';
class VariablesUC {
    constructor({ variablesRepository, variableTypesRepository, variablesOptionsRepository }) {
        this.variablesRepository = variablesRepository;
        this.variableTypesRepository = variableTypesRepository;
        this.variablesOptionsRepository = variablesOptionsRepository;
    }

    async getRiskVariables() {
        return await this.variableTypesRepository.findAll({
            relations: ['variables'],
        });
    }

    async getVariablesAndOptions(type) {
        try {
            const allVariables = await this.variablesRepository.findAll({
                relations: ['variable_type', 'user'],
                fields: ['id_variable', 'name', 'description', 'weight', 'enable'],
                where: { variable_type: type },
                order: { id_variable: 'ASC' }
            });

            const variablesOption = [];
            for (let i = 0; i < allVariables.length; i++) {
                const idVariables = allVariables[i].id_variable;
                const options = await this.variablesOptionsRepository.findAll({
                    relations: ['variables'],
                    fields: ["id_variables_options", "name", "description", "weight", "toDefault"],
                    where: { variables: idVariables },
                    order: { id_variables_options: 'ASC' }
                });
                variablesOption.push(options);
            };
            return [{
                allVariables,
                variablesOption
            }];
        } catch (error) {
            console.log('error', error)
            throw new InvalidControl('Error en control', 'control');
        }
    }
}

export default VariablesUC;
