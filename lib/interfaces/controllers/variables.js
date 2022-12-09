import VariablesRepository from '../../infrastructure/orm/repositories/variables';
import VariableTypesRepository from '../../infrastructure/orm/repositories/variable-types';
import VariablesUC from '../../application/use-cases/variables/variables';

const getRiskVariables = async function () {
    const variablesRepository = new VariablesRepository();
    const variableTypesRepository = new VariableTypesRepository();
    const useCase = new VariablesUC({
        variablesRepository,
        variableTypesRepository,
    });
  
    const variables = await useCase.getRiskVariables();
    return {
      statusCode: 200,
      body: variables,
    };
  };

module.exports = {
    getRiskVariables,
}