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

const deleteProcessRisk = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const processRiskRepository = new ProcessRiskRepository();
  const useCase = new ProcessRiskUC({ processRiskRepository, });
  const deleteElemet = await useCase.deleteProcessRisk(id);

  if (deleteElemet.affected > 0) {
    return {
      statusCode: 200,
      body: { message: 'Realción eliminada' }
    };    
  } else {
    return {
      statusCode: 400,
      body: { message: 'No se pudo eliminar la relación' }
    };
  }
};

module.exports = {
  getProcessRisk,
  saveProcessRisk,
  getProcessRiskByProcess,
  getRiskProcessByProcess,
  deleteProcessRisk
}