import ControlsUC from '../../application/use-cases/controls/controls';
import ControlsRepository from '../../infrastructure/orm/repositories/controls';
import ControlsVariablesRepository from '../../infrastructure/orm/repositories/controls-variables';
import ControlsRiskUC from '../../application/use-cases/controls/controls-risk';
import ControlsRiskRepository from '../../infrastructure/orm/repositories/controls-risk';

/** */
import SolidityUC from '../../application/use-cases/solidity/solidity';
import SolidityRepository from '../../infrastructure/orm/repositories/solidity';
import WeightAssignmentUC from '../../application/use-cases/weight-assignment/weight-assignment';
import WeightAssignmentRepository from '../../infrastructure/orm/repositories/weight-assignment';

import VariablesUC from '../../application/use-cases/variables/variables';
import VariablesRepository from '../../infrastructure/orm/repositories/variables';
import VariableTypesRepository from '../../infrastructure/orm/repositories/variable-types';
import VariablesOptionsRepository from '../../infrastructure/orm/repositories/variables-options';
/** */

const getControls = async function (httpRequest) {
  console.log(httpRequest)
  const controlsRepository = new ControlsRepository();
  const useCase = new ControlsUC({ controlsRepository, });
  const controls = await useCase.getControls(httpRequest.query);

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

  const controls = await useCase.saveControls(httpRequest.body, httpRequest.user, language);

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
    const useCase = new ControlsUC({ controlsVariablesRepository, });

    const controlsVariable = await useCase.saveControlVariableOptions(httpRequest.body, httpRequest.user, language);

    return {
      statusCode: 200,
      body: controlsVariable,
    };
  } catch (e) {
    console.log('error', e)
  }

};

const deleteControl = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const controlsRiskRepository = new ControlsRiskRepository();
  const useCaseCR = new ControlsRiskUC({ controlsRiskRepository });
  const controlRisk = await useCaseCR.getControlsRiskById(id);

  if (controlRisk.length === 0) {
    const controlsRepository = new ControlsRepository();
    const useCase = new ControlsUC({ controlsRepository });
    const control = await useCase.deleteControl(id);

    if (control.raw === 0) {
      return {
        statusCode: 400,
        body: { message: 'No se pudo eliminar el control' }
      };
    } else {
      return {
        statusCode: 200,
        body: { message: 'Control eliminado' }
      };
    }
  } else {
    return {
      statusCode: 400,
      body: { message: 'El control tiene riesgos relacionados' }
    };
  }
};


/** */
const updControls = async function (httpRequest) {
  try {
    const language = httpRequest.headers?.Language;

    /**tipos de variables q se usan */
    const typeExecucion = 5;
    const typeDesign = 4;

    /**obtenemos los valores de solidez */
    const solidityRepository = new SolidityRepository();
    const usesolidity = new SolidityUC({ solidityRepository, });
    const solidity = await usesolidity.getSolidity();

    /**obtenemos los valores de asignación de peso */
    const weightAssignmentRepository = new WeightAssignmentRepository();
    const useWeight = new WeightAssignmentUC({ weightAssignmentRepository, });
    const weight = await useWeight.getWeightAssignment();
    const infoDesign = weight.find(element => element.id_weight_assignment === 1); //'Diseño'
    const infoExecution = weight.find(element => element.id_weight_assignment === 2); //'Ejecución'

    /**obtenemos todos los controles */
    const controlsRepository = new ControlsRepository();
    const useControl = new ControlsUC({ controlsRepository, });
    let controls = await useControl.getControlsAll();

    const controlsVariablesRepository = new ControlsVariablesRepository();
    const useControlVariables = new ControlsUC({ controlsVariablesRepository, }); //caso de uso para actualizar la opción se usa en el for

    let temp;
    for (let i = 0; i < controls?.length; i++) {
      console.log("🚀 ~ file: controls.js:161 ~ updControls ~ controls[i]:", controls[i]['id_controls'])
      /**
       * !!VARIABLES DE DISEÑO
       */
      let controlsVariables = await controlsVariablesRepository.getControlVariableOptions(controls[i]['id_controls'], typeDesign);
      let qualification_design = 0;

      temp = {};
      temp.id_controls = controls[i]['id_controls'];
      for (let j = 0; j < controlsVariables?.length; j++) {
        controlsVariables[j].controls = temp;
        temp = {};
        temp.id_variable = controlsVariables[j]['id_variable'];
        controlsVariables[j].variables = temp;
        temp = {};
        temp.id_variables_options = controlsVariables[j]['id_variables_options'];
        controlsVariables[j].variablesOptions = temp;

        controlsVariables[j]['qualification'] = ((controlsVariables[j]['weight_var'] / 100) * (controlsVariables[j]['weight_opt'] / 100)) * 100; //calculo de la calificación de la opcion 
        qualification_design = qualification_design + controlsVariables[j]['qualification'];
        await useControlVariables.saveControlVariableOptions(controlsVariables[j], httpRequest.user, language);
      }
      console.log("🚀 ~ file: controls.js:161 ~ updControls ~ controls[i]:", controls[i]['id_controls'])
      console.log("🚀 ~ file: controls.js:164 ~ updControls ~ qualification_design:", qualification_design)
      controls[i]['qualification_design'] = qualification_design;

      /**bucamos la solidez segun la calificación del diseño */
      solidity?.filter(item => controls[i].qualification_design >= item.weight_since && controls[i].qualification_design <= item.weight_until)
        .forEach(element => {
          controls[i].solidityDesign = element;
        });

      /**
       * !!VARIABLES DE EJECUCIÓN
       */
      controlsVariables = await controlsVariablesRepository.getControlVariableOptions(controls[i]['id_controls'], typeExecucion);
      let qualification_execution = 0;

      temp = {};
      temp.id_controls = controls[i]['id_controls'];
      for (let j = 0; j < controlsVariables?.length; j++) {
        controlsVariables[j].controls = temp;
        temp = {};
        temp.id_variable = controlsVariables[j]['id_variable'];
        controlsVariables[j].variables = temp;
        temp = {};
        temp.id_variables_options = controlsVariables[j]['id_variables_options'];
        controlsVariables[j].variablesOptions = temp;

        controlsVariables[j]['qualification'] = ((controlsVariables[j]['weight_var'] / 100) * (controlsVariables[j]['weight_opt'] / 100)) * 100; //calculo de la calificación de la opcion 
        qualification_execution = qualification_execution + controlsVariables[j]['qualification'];
        await useControlVariables.saveControlVariableOptions(controlsVariables[j], httpRequest.user, language);
      }
      console.log("🚀 ~ file: controls.js:161 ~ updControls ~ controls[i]:", controls[i]['id_controls'])
      console.log("🚀 ~ file: controls.js:164 ~ updControls ~ qualification_execution:", qualification_execution)
      controls[i]['qualification_execution'] = qualification_execution;

      /**bucamos la solidez segun la calificación del ejecución */
      solidity?.filter(item => controls[i].qualification_execution >= item.weight_since && controls[i].qualification_execution <= item.weight_until)
        .forEach(element => {
          controls[i].solidityExecution = element;
        });

      /**
       * ! PESOS DE ASIGNACIÓN
       */
      controls[i].final_design = ((controls[i].qualification_design / 100) * (infoDesign?.weight / 100)) * 100; //'Diseño'
      controls[i].final_execution = ((controls[i].qualification_execution / 100) * (infoExecution.weight / 100)) * 100; //'Ejecución'
      controls[i].value_solidity = controls[i].final_design + controls[i].final_execution;

      solidity?.filter(item => controls[i].value_solidity >= item.weight_since && controls[i].value_solidity <= item.weight_until)
        .forEach(element => {
          controls[i].solidityGeneral = element;
        });

      await useControl.saveControls(controls[i], httpRequest.user, language)
    }

    return {
      statusCode: 200,
      //body: controlsVariables //{ "msg": "Actualización Terminada" },
      //body: controls //{ "msg": "Actualización Terminada" },
      //body: solidity //{ "msg": "Actualización Terminada" },
      //body: 'hola'
      body: { "msg": "Actualización Terminada" },
    };

  } catch (e) {
    console.log('error', e)
  }

};
/** */

module.exports = {
  getControls,
  saveControls,
  getControlsById,
  getControlVariableOptions,
  saveControlVariableOptions,
  deleteControl,
  updControls
}