import GetProcessUC from '../../application/use-cases/process/get-process'
import ProcessRepository from '../../infrastructure/orm/repositories/process';

const getProcess = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const processRepository = new ProcessRepository();
  const useCase = new GetProcessUC({
    processRepository,
  });

  const process = await useCase.getProcess(language);

  return {
    statusCode: 200,
    body: process,
  };
};

const saveProcess = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const processRepository = new ProcessRepository();
  const useCase = new GetProcessUC({
    processRepository,
  });

  const process = await useCase.saveProcess(httpRequest.body, language);
  return {
    statusCode: 200,
    body: process,
  };
};

const getProcessById = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const processRepository = new ProcessRepository();
  const useCase = new GetProcessUC({
    processRepository,
  });

  const process = await useCase.getProcessById({ id, }, language);

  return {
    statusCode: 200,
    body: process,
  };
};

const getProcessByMacro = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const processRepository = new ProcessRepository();
  const useCase = new GetProcessUC({
    processRepository,
  });

  const process = await useCase.getProcessByMacro({ id, }, language);

  return {
    statusCode: 200,
    body: process,
  };
};

const getProcessSocio = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const processRepository = new ProcessRepository();
  const useCase = new GetProcessUC({
    processRepository,
  });
  
  const process = await processRepository.getProcessSocio(id);

  return {
    statusCode: 200,
    body: process,
  };
};

module.exports = {
  getProcess,
  saveProcess,
  getProcessById,
  getProcessByMacro,
  getProcessSocio
}