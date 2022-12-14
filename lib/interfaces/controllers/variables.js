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
    getRiskVariables,
    insertRiskVariables
}