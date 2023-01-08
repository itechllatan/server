import ControlsUC from '../../application/use-cases/controls/controls';
import ControlsRepository from '../../infrastructure/orm/repositories/controls';
import ControlsVariablesRepository from '../../infrastructure/orm/repositories/controls-variables';

const getControls = async function (httpRequest) {
  const controlsRepository = new ControlsRepository();
  const useCase = new ControlsUC({ controlsRepository, });

  const controls = await useCase.getControls();

  return {
    statusCode: 200,
    body: controls,
  };
};

const getControlsById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }
  const controlsRepository = new ControlsRepository();
  const useCase = new ControlsUC({ controlsRepository });
  const controls = await useCase.getControlsById(id);
  return {
    statusCode: 200,
    body: controls
  };
};

const saveControls = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const controlsRepository = new ControlsRepository();
  const useCase = new ControlsUC({
    controlsRepository,
  });

  const controls = await useCase.saveControls(httpRequest.body, language);

  return {
    statusCode: 201,
    body: controls,
  };
};

const getControlVariableOptions = async function (httpRequest) {
  const { id, type } = httpRequest.params;
  if (!id || !type) {
    return {
      statusCode: 400,
      message: "Parametro Id y Type  es requerido"
    }
  }

  const controlsVariablesRepository = new ControlsVariablesRepository();
  const controlsVariables = await controlsVariablesRepository.getControlVariableOptions(id, type);

  return {
    statusCode: 200,
    body: controlsVariables,
  };
};

const saveControlVariableOptions = async function (httpRequest) {
  try {
    const language = httpRequest.headers?.Language;
    const controlsVariablesRepository = new ControlsVariablesRepository();
    const useCase = new ControlsUC({
      controlsVariablesRepository,
    });

    console.log('httpRequest.body', httpRequest.body)
    const controlsVariable = await useCase.saveControlVariableOptions(httpRequest.body, language);

    return {
      statusCode: 200,
      body: controlsVariable,
    };
  } catch (e) {
    console.log('error', e)
  }

};

const getControlByText = async function (httpRequest) {
  const { text } = httpRequest.params;
  if (!text) {
    return {
      statusCode: 400,
      message: "Parametro Texto es requerido"
    }
  }

  const controlsRepository = new ControlsRepository();
  const useCase = new ControlsUC({ controlsRepository });
  const controls = await useCase.getControlByText(text);

  return {
    statusCode: 200,
    body: controls
  };
};

module.exports = {
  getControls,
  saveControls,
  getControlsById,
  getControlVariableOptions,
  saveControlVariableOptions,
  getControlByText,
}