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

const insertRiskVariables = async function (httpRequest) {
  const { body } = httpRequest;
  if(!body?.variables){
    return { statusCode: 400, body:{
      message: "Variables no existentes"
    }}
  }

  const variablesRepository = new VariablesRepository();
  const variableTypesRepository = new VariableTypesRepository();
  const useCase = new VariablesUC({
      variablesRepository,
      variableTypesRepository,
  });

  const variables = await useCase.insertRiskVariables(body, httpRequest.user);
  return {
    statusCode: 201,
    body: variables,
  };
}
module.exports = {
  getVariablesAndOptions,
    getRiskVariables,
    insertRiskVariables,
}