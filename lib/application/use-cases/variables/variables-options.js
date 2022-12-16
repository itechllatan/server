class VariablesOptionsUC {
    constructor({ variablesRepository, variableTypesRepository, variablesOptionsRepository }) {
        this.variablesRepository = variablesRepository;
        this.variableTypesRepository = variableTypesRepository;
        this.variablesOptionsRepository = variablesOptionsRepository;
    }

    async getVariablesOptions() {
        return await this.variablesOptionsRepository.findAll(
            {
                relations: ['variables'],
                fields: ["id_variables_options", "name", "description", "weight", "toDefault", "variables"],
                order: { id_variables_options: 'ASC' }
            }
        );
    }

    async getVariableOptionById(id) {
        return await this.variablesOptionsRepository.findAll({
            relations: ['variables'],
            fields: ["id_variables_options", "name", "description", "weight", "toDefault"],
            where: { id_variables_options: id },
        });
    }


}

export default VariablesOptionsUC;
