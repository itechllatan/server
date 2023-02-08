import VariablesOptionsRepository from '../../infrastructure/orm/repositories/variables-options';
import VariablesOptionsUC from '../../application/use-cases/variables/variables-options';

import ControlsUC from '../../application/use-cases/controls/controls';
import ControlsVariablesRepository from '../../infrastructure/orm/repositories/controls-variables';

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

const deleteVariableOption = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const controlsVariablesRepository = new ControlsVariablesRepository();
  const useCase1 = new ControlsUC({ controlsVariablesRepository, });
  const controlsVariables = await useCase1.getControlVariableOptionsByVariableOption(id);

  if (controlsVariables.length === 0) {
    const variablesOptionsRepository = new VariablesOptionsRepository();
    const useCase2 = new VariablesOptionsUC({ variablesOptionsRepository, });
    const deleteElemet = await useCase2.deleteVariableOption(id, httpRequest.user);

    if (deleteElemet.raw === 0) {
      return {
        statusCode: 400,
        body: { message: 'No se pudo eliminar la opción' }
      };
    } else {
      return {
        statusCode: 200,
        body: { message: 'Opción eliminada' }
      };
    }
  } else {
    return {
      statusCode: 400,
      body: { message: 'La opción se usa en controles' }
    };
  }
};

module.exports = {
  getVariablesOptions,
  getVariableOptionById,
  saveVariablesOptions,
  deleteVariableOption
}