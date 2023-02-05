import VariablesOptionsRepository from '../../infrastructure/orm/repositories/variables-options';
import VariablesOptionsUC from '../../application/use-cases/variables/variables-options';

const getVariablesOptions = async function () {
  const variablesOptionsRepository = new VariablesOptionsRepository();
  const useCase = new VariablesOptionsUC({
    variablesOptionsRepository,
  });

  const variables = await useCase.getVariablesOptions();
  return {
    statusCode: 200,
    body: variables,
  };
};

const getVariableOptionById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro type es requerido"
    }
  }
  const variablesOptionsRepository = new VariablesOptionsRepository();
  const useCase = new VariablesOptionsUC({ variablesOptionsRepository, });

  const variables = await useCase.getVariableOptionById(id);
  return {
    statusCode: 200,
    body: variables,
  };
};

const saveVariablesOptions = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const variablesOptionsRepository = new VariablesOptionsRepository();
  const useCase = new VariablesOptionsUC({ variablesOptionsRepository, });

  const variables = await useCase.saveVariablesOptions(httpRequest.body, language);

  return {
    statusCode: 201,
    body: variables,
  };
};

module.exports = {
  getVariablesOptions,
  getVariableOptionById,
  saveVariablesOptions
}