import MacroprocessRiskUC from '../../application/use-cases/macroprocess-risk/macroprocess-risk';
import MacroprocessRiskRepository from '../../infrastructure/orm/repositories/macroprocess-risk';

const getMacroprocessRisk = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const macroprocessRiskRepository = new MacroprocessRiskRepository();
  const useCase = new MacroprocessRiskUC({
    macroprocessRiskRepository,
  });

  const data = await useCase.getMacroProcessRisk(language)
  return {
    statusCode: 200,
    body: data,
  };
};

const saveMacroprocessRisk = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const macroprocessRiskRepository = new MacroprocessRiskRepository();
  const useCase = new MacroprocessRiskUC({
    macroprocessRiskRepository,
  });
  
  const macroprocessRisk = await useCase.saveMacroprocessRisk(httpRequest.body, language);
  return {
    statusCode: 200,
    body: macroprocessRisk,
  };
};

const getMacroprocessRiskById = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const macroprocessRiskRepository = new MacroprocessRiskRepository();
  const useCase = new MacroprocessRiskUC({
    macroprocessRiskRepository,
  });

  const data = await useCase.getMacroprocessRiskById({ id, }, language);
  return {
    statusCode: 200,
    body: data
  }
};

module.exports = {
  getMacroprocessRisk,
  saveMacroprocessRisk,
  getMacroprocessRiskById,
}