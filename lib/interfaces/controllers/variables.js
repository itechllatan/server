import VariablesRepository from '../../infrastructure/orm/repositories/variables';
import VariableTypesRepository from '../../infrastructure/orm/repositories/variable-types';
import VariablesOptionsRepository from '../../infrastructure/orm/repositories/variables-options';
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

const getVariablesAndOptions = async function (httpRequest) {
  const { type } = httpRequest.params;
  if (!type) {
    return {
      statusCode: 400,
      message: "Parametro type es requerido"
    }
  }
  const variablesRepository = new VariablesRepository();
  const variableTypesRepository = new VariableTypesRepository();
  const variablesOptionsRepository = new VariablesOptionsRepository();

  const useCase = new VariablesUC({
    variablesRepository,
    variableTypesRepository,
    variablesOptionsRepository,
  });

  const variables = await useCase.getVariablesAndOptions(type);
  return {
    statusCode: 200,
    body: variables,
  };
};

module.exports = {
  getRiskVariables,
  getVariablesAndOptions,
}