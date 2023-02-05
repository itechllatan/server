import SubprocessRiskUC from '../../application/use-cases/subprocess-risk/subprocess-risk';
import SubprocessRiskRepository from '../../infrastructure/orm/repositories/subprocess-risk';

const getSubprocessRisk = async function (httpRequest) {
  const subprocessRiskRepository = new SubprocessRiskRepository();
  const useCase = new SubprocessRiskUC({
    subprocessRiskRepository,
  });

  const data = await useCase.getSubprocessRisk();
  return {
    statusCode: 200,
    body: data,
  };
};

const saveSubprocessRisk = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const subprocessRiskRepository = new SubprocessRiskRepository();
  const useCase = new SubprocessRiskUC({
    subprocessRiskRepository,
  });

  const subprocessRisk = await useCase.saveSubprocessRisk(httpRequest.body, httpRequest.user, language);
  return {
    statusCode: 201,
    body: subprocessRisk,
  };
};

const getSubprocessRiskById = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const subprocessRiskRepository = new SubprocessRiskRepository();
  const useCase = new SubprocessRiskUC({ subprocessRiskRepository, });

  const data = await useCase.getSubprocessRiskById(id, language);
  return {
    statusCode: 200,
    body: data
  }
};

const getRiskSubprocessById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const subprocessRiskRepository = new SubprocessRiskRepository();
  const useCase = new SubprocessRiskUC({ subprocessRiskRepository, });

  const data = await useCase.getRiskSubprocessById(id);
  return {
    statusCode: 200,
    body: data
  }
};

module.exports = {
  getSubprocessRisk,
  saveSubprocessRisk,
  getSubprocessRiskById,
  getRiskSubprocessById,
}