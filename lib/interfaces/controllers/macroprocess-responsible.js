import MacroprocessResponsibleUC from '../../application/use-cases/macroprocess-responsible/macroprocess-responsible';
import MacroprocessResponsibleRepository from '../../infrastructure/orm/repositories/macroprocess-responsible';

// const getMacroprocessRisk = async function (httpRequest) {
//   const language = httpRequest.headers?.Language;
//   const macroprocessRiskRepository = new MacroprocessRiskRepository();
//   const useCase = new MacroprocessRiskUC({ macroprocessRiskRepository, });

//   const data = await useCase.getMacroProcessRisk(language)
//   return {
//     statusCode: 200,
//     body: data,
//   };
// };

// const saveMacroprocessRisk = async function (httpRequest) {
//   const language = httpRequest.headers?.Language;
//   const macroprocessRiskRepository = new MacroprocessRiskRepository();
//   const useCase = new MacroprocessRiskUC({
//     macroprocessRiskRepository,
//   });

//   const macroprocessRisk = await useCase.saveMacroprocessRisk(httpRequest.body, httpRequest.user, language);
//   return {
//     statusCode: 201,
//     body: macroprocessRisk,
//   };
// };

// const getMacroprocessRiskById = async function (httpRequest) {
//   const { id } = httpRequest.params;
//   if (!id) {
//     return {
//       statusCode: 400,
//       message: "Parametro Id es requerido"
//     }
//   }

//   const macroprocessRiskRepository = new MacroprocessRiskRepository();
//   const useCase = new MacroprocessRiskUC({ macroprocessRiskRepository, });

//   const data = await useCase.getMacroprocessRiskById(id);
//   return {
//     statusCode: 200,
//     body: data
//   }
// };

// const getRiskMacroprocessById = async function (httpRequest) {
//   const { id } = httpRequest.params;
//   if (!id) {
//     return {
//       statusCode: 400,
//       message: "Parametro Id es requerido"
//     }
//   }

//   const macroprocessRiskRepository = new MacroprocessRiskRepository();
//   const useCase = new MacroprocessRiskUC({ macroprocessRiskRepository, });

//   const data = await useCase.getRiskMacroprocessById(id);
//   return {
//     statusCode: 200,
//     body: data
//   }
// };

// const deleteMacroprocessRisk = async function (httpRequest) {
//   const { id } = httpRequest.params;
//   if (!id) {
//     return {
//       statusCode: 400,
//       message: "Parametro Id es requerido"
//     }
//   }

//   const macroprocessRiskRepository = new MacroprocessRiskRepository();
//   const useCase = new MacroprocessRiskUC({ macroprocessRiskRepository, });
//   const deleteElemet = await useCase.deleteMacroprocessRisk(id);

//   if (deleteElemet.raw === 0) {
//     return {
//       statusCode: 400,
//       body: { message: 'No se pudo eliminar la relación' }
//     };
//   } else {
//     return {
//       statusCode: 200,
//       body: { message: 'Realción eliminada' }
//     };
//   }
// };

const getMacroprocessResponsibleById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const macroprocessResponsibleRepository = new MacroprocessResponsibleRepository();
  const useCase = new MacroprocessResponsibleUC({ macroprocessResponsibleRepository, });

  const data = await useCase.getMacroprocessResponsibleById(id);
  return {
    statusCode: 200,
    body: data
  }
};

const saveMacroprocessResponsible = async function (httpRequest) {
  const macroprocessResponsibleRepository = new MacroprocessResponsibleRepository();
  const useCase = new MacroprocessResponsibleUC({ macroprocessResponsibleRepository, });

  const saveInfo = await useCase.saveMacroprocessResponsible(httpRequest.body, httpRequest.user);
  return {
    statusCode: 201,
    body: saveInfo,
  };
};

const deleteMacroprocessResponsible = async function (httpRequest) {
  try {
    const { id } = httpRequest.params;
    if (!id) {
      return {
        statusCode: 400,
        message: "Parametro Id es requerido"
      }
    }

    const macroprocessResponsibleRepository = new MacroprocessResponsibleRepository();
    const useCase = new MacroprocessResponsibleUC({ macroprocessResponsibleRepository, });
    const deleteElemet = await useCase.deleteMacroprocessResponsible(id, httpRequest.user);

    if (deleteElemet.raw === 0) {
      return {
        statusCode: 400,
        body: { message: 'No se pudo eliminar la relación' }
      };
    } else {
      return {
        statusCode: 200,
        body: { message: 'Realción eliminada' }
      };
    }
  } catch (e) {
    console.log(e)
    return { statusCode: 400, body: e }
  }
};

module.exports = {
  getMacroprocessResponsibleById,
  saveMacroprocessResponsible,
  deleteMacroprocessResponsible
}