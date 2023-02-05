import MacroProcessUC from '../../application/use-cases/macro_process/macro_process';
import MacroProcessRepository from '../../infrastructure/orm/repositories/macro-process';
import MacroprocessRiskUC from '../../application/use-cases/macroprocess-risk/macroprocess-risk';
import MacroprocessRiskRepository from '../../infrastructure/orm/repositories/macroprocess-risk';
import GetProcessUC from '../../application/use-cases/process/get-process'
import ProcessRepository from '../../infrastructure/orm/repositories/process';

const getMacroProcess = async function (httpRequest) {
  const macroProcessRepository = new MacroProcessRepository();
  const useCase = new MacroProcessUC({
    macroProcessRepository,
  });

  const macroProcess = await useCase.getMacroProcess();
  return {
    statusCode: 200,
    body: macroProcess,
  };
};

const getMacroProcessById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const macroProcessRepository = new MacroProcessRepository();
  const useCase = new MacroProcessUC({ macroProcessRepository, });
  const macroProcess = await useCase.getMacroProcessById(id);
  return {
    statusCode: 200,
    body: macroProcess,
  };
};

const saveMacroProcess = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const macroProcessRepository = new MacroProcessRepository();
  const useCase = new MacroProcessUC({
    macroProcessRepository,
  });

  const macroProcess = await useCase.saveMacroProcess(httpRequest.body, httpRequest.user, language);
  return {
    statusCode: 201,
    body: macroProcess,
  };
};

const getMacroProcessText = async function (httpRequest) {
  const { text } = httpRequest.params;
  if (!text) {
    return {
      statusCode: 400,
      message: "Parametro Texto es requerido"
    }
  }
  const macroProcessRepository = new MacroProcessRepository();
  const useCase = new MacroProcessUC({
    macroProcessRepository,
  });

  const macroProcess = await useCase.getMacroProcessText(text);
  return {
    statusCode: 200,
    body: macroProcess,
  };
};

const deleteMacroProcess = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const macroprocessRiskRepository = new MacroprocessRiskRepository();
  const useCase = new MacroprocessRiskUC({ macroprocessRiskRepository, });
  const data = await useCase.getMacroprocessRiskById(id);

  console.log('data', data)
  if (data.length === 0) {
    const processRepository = new ProcessRepository();
    const useCase = new GetProcessUC({ processRepository, });
    const process = await useCase.getProcessByMacro(id);

    console.log('process',process)

    if (process.length === 0) {
      const macroProcessRepository = new MacroProcessRepository();
      const useCase = new MacroProcessUC({ macroProcessRepository });
      const deleteElemet = await useCase.deleteMacroProcess(id);

      if (deleteElemet.raw === 0) {
        return {
          statusCode: 400,
          body: { message: 'No se pudo eliminar el macro proceso' }
        };
      } else {
        return {
          statusCode: 200,
          body: { message: 'Macro proceso eliminado' }
        };
      }

    } else {
      return {
        statusCode: 400,
        body: { message: 'El macro proceso tiene procesos relacionados' }
      };
    }
  } else {
    return {
      statusCode: 400,
      body: { message: 'El macro proceso tiene riesgos relacionados' }
    };
  }
};

module.exports = {
  getMacroProcess,
  saveMacroProcess,
  getMacroProcessById,
  getMacroProcessText,
  deleteMacroProcess
}