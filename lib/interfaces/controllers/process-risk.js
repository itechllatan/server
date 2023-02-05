import ProcessRiskUC from '../../application/use-cases/process-risk/process-risk';
import ProcessRiskRepository from '../../infrastructure/orm/repositories/process-risk';

const getProcessRisk = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const processRiskRepository = new ProcessRiskRepository();
  const useCase = new ProcessRiskUC({ processRiskRepository, });

  const processRisk = await useCase.getProcessRisk(language);

  return {
    statusCode: 200,
    body: processRisk,
  };
};

const saveProcessRisk = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const processRiskRepository = new ProcessRiskRepository();
  const useCase = new ProcessRiskUC({
    processRiskRepository,
  });

  const processRisk = await useCase.saveProcessRisk(httpRequest.body, httpRequest.user, language);
  return {
    statusCode: 201,
    body: processRisk,
  };
};

const getProcessRiskByProcess = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const processRiskRepository = new ProcessRiskRepository();
  const useCase = new ProcessRiskUC({ processRiskRepository, });

  const processRisk = await useCase.getProcessRiskByProcess(id, language);

  return {
    statusCode: 200,
    body: processRisk,
  };
};

const getRiskProcessByProcess = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const processRiskRepository = new ProcessRiskRepository();
  const useCase = new ProcessRiskUC({ processRiskRepository, });

  const processRisk = await useCase.getRiskProcessByProcess(id);

  return {
    statusCode: 200,
    body: processRisk,
  };
};


module.exports = {
  getProcessRisk,
  saveProcessRisk,
  getProcessRiskByProcess,
  getRiskProcessByProcess
}