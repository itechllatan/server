import VariablesRepository from '../../infrastructure/orm/repositories/variables';
import VariableTypesRepository from '../../infrastructure/orm/repositories/variable-types';
import VariablesUC from '../../application/use-cases/variables/variables';
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

module.exports = {
  getVariablesOptions,
}