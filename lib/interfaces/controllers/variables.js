import VariablesRepository from '../../infrastructure/orm/repositories/variables';
import VariableTypesRepository from '../../infrastructure/orm/repositories/variable-types';
import VariablesOptionsRepository from '../../infrastructure/orm/repositories/variables-options';
import VariablesUC from '../../application/use-cases/variables/variables';

import ControlsRepository from '../../infrastructure/orm/repositories/controls';
import ControlsUC from '../../application/use-cases/controls/controls';
import ControlsVariablesRepository from '../../infrastructure/orm/repositories/controls-variables';

import VariablesLevelUC from '../../application/use-cases/variables/variables-level';
import VariablesLevelRepository from '../../infrastructure/orm/repositories/variables-level';

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
  if (!body?.variables) {
    return {
      statusCode: 400, body: {
        message: "Variables no existentes"
      }
    }
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
};

const saveVariable = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const variablesRepository = new VariablesRepository();
  const useCase = new VariablesUC({ variablesRepository, });

  const variables = await useCase.saveVariable(httpRequest.body, language);

  return {
    statusCode: 201,
    body: variables,
  };
};

const getVariables = async function (httpRequest) {
  const { type } = httpRequest.params;
  if (!type) {
    return {
      statusCode: 400,
      message: "Parametro type es requerido"
    }
  }

  const variablesRepository = new VariablesRepository();
  const useCase = new VariablesUC({ variablesRepository, });
  const variables = await useCase.getVariables(type);
  return {
    statusCode: 200,
    body: variables,
  };
};

const deleteVariables = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const controlsVariablesRepository = new ControlsVariablesRepository();
  const useCase1 = new ControlsUC({ controlsVariablesRepository, });
  const controlsVariables = await useCase1.getControlVariableOptionsByVariable(id);

  if (controlsVariables.length === 0) {

    const variablesLevelRepository = new VariablesLevelRepository();
    const useCase2 = new VariablesLevelUC({ variablesLevelRepository, });
    const level = await useCase2.getVariablesLevelById(id);

    if (level.length === 0) {
      const variablesRepository = new VariablesRepository();
      const useCase3 = new VariablesUC({ variablesRepository, });
      const deleteElemet = await useCase3.deleteVariables(id, httpRequest.user);

      if (deleteElemet.raw === 0) {
        return {
          statusCode: 400,
          body: { message: 'No se pudo eliminar la variable' }
        };
      } else {
        return {
          statusCode: 200,
          body: { message: 'Variable eliminada' }
        };
      }
    } else {
      return {
        statusCode: 400,
        body: { message: 'La variable se usa en niveles de criticidad' }
      };
    }
  } else {
    return {
      statusCode: 400,
      body: { message: 'La variable se usa en controles' }
    };
  }
};

module.exports = {
  getVariablesAndOptions,
  getRiskVariables,
  insertRiskVariables,
  saveVariable,
  getVariables,
  deleteVariables
}