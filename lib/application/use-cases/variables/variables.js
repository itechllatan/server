class VariablesUC {
    constructor({ variablesRepository, variableTypesRepository}) {
        this.variablesRepository = variablesRepository;
        this.variableTypesRepository = variableTypesRepository;
    }

    async getRiskVariables() {
        return await this.variableTypesRepository.findAll({
            relations: ['variables'],
        });
    }

}

export default VariablesUC;
