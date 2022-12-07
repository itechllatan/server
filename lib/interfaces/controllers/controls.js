import ControlsUC from '../../application/use-cases/controls/controls';
import ControlsRepository from '../../infrastructure/orm/repositories/controls';
import ControlsVariablesDesignRepository from '../../infrastructure/orm/repositories/controls-variables-design';
import ControlsVariablesExecutionRepository from '../../infrastructure/orm/repositories/controls-variables-execution';

const getControls = async function (httpRequest) {
  const controlsRepository = new ControlsRepository();
  const useCase = new ControlsUC({
    controlsRepository,
  });

  const controls = await useCase.getControls();

  return {
    statusCode: 200,
    body: controls,
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

const getControlVarDesignOptions = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const controlsRepository = new ControlsRepository();
  const controlVarDesign = await controlsRepository.getControlVarDesignOptions(id)
  return {
    statusCode: 200,
    body: controlVarDesign
  };
};

const saveControlVarDesignOptions = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const controlsVariablesDesignRepository = new ControlsVariablesDesignRepository();
  const useCase = new ControlsUC({
    controlsVariablesDesignRepository,
  });

  const controlsDesign = await useCase.saveControlVarDesignOptions(httpRequest.body, language);

  return {
    statusCode: 200,
    body: controlsDesign,
  };
};

const getControlVarExecutionOptions = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const controlsRepository = new ControlsRepository();
  const controlVarDesign = await controlsRepository.getControlVarExecutionOptions(id)
  return {
    statusCode: 200,
    body: controlVarDesign
  };
};

const saveControlVarExecutionOptions = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const controlsVariablesExecutionRepository = new ControlsVariablesExecutionRepository();
  const useCase = new ControlsUC({
    controlsVariablesExecutionRepository,
  });

  const controlsDesign = await useCase.saveControlVarExecutionOptions(httpRequest.body, language);

  return {
    statusCode: 200,
    body: controlsDesign,
  };
};

module.exports = {
  getControls,
  saveControls,
  getControlsById,
  getControlVarDesignOptions,
  saveControlVarDesignOptions,
  getControlVarExecutionOptions,
  saveControlVarExecutionOptions
}