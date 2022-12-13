class VariablesOptionsUC {
    constructor({ variablesRepository, variableTypesRepository, variablesOptionsRepository }) {
        this.variablesRepository = variablesRepository;
        this.variableTypesRepository = variableTypesRepository;
        this.variablesOptionsRepository = variablesOptionsRepository;
    }

    async getVariablesOptions(id) {
        return await this.variablesOptionsRepository.findAll(
            {
                relations: ['variables'],
                fields: ["id_variables_options", "name", "description", "weight", "toDefault", "variables"],
                where: { variables: id },
                order: { id_variables_options: 'ASC' }
            }
        );
    }

}

export default VariablesOptionsUC;
