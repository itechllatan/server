import MacroProcessUC from '../../application/use-cases/macro_process/macro_process';
import MacroProcessRepository from '../../infrastructure/orm/repositories/macro-process';

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

module.exports = {
  getMacroProcess,
  saveMacroProcess,
  getMacroProcessById,
}