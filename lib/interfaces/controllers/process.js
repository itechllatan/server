import GetProcessUC from '../../application/use-cases/process/get-process'
import ProcessRepository from '../../infrastructure/orm/repositories/process';

import ProcessQualificationUC from '../../application/use-cases/process/process-qualification';
import ProcessQualificationRepository from '../../infrastructure/orm/repositories/process-qualification';

const getProcess = async function (httpRequest) {
  const processRepository = new ProcessRepository();
  const useCase = new GetProcessUC({ processRepository, });

  const process = await useCase.getProcess();

  return {
    statusCode: 200,
    body: process,
  };
};

const getProcessById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const processRepository = new ProcessRepository();
  const useCase = new GetProcessUC({ processRepository, });
  const process = await useCase.getProcessById(id);
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

  const process = await useCase.saveProcess(httpRequest.body, httpRequest.user, language);
  return {
    statusCode: 201,
    body: process,
  };
};

const getProcessByMacro = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const processRepository = new ProcessRepository();
  const useCase = new GetProcessUC({ processRepository, });

  const process = await useCase.getProcessByMacro(id);

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

const getProcessQualification = async function (httpRequest) {
  const { id, type } = httpRequest.params;
  if (!id || !type) {
    return {
      statusCode: 400,
      message: "Parametro Id y Type es requerido"
    }
  }

  const processQualificationRepository = new ProcessQualificationRepository();
  const useCase = new ProcessQualificationUC({ processQualificationRepository, });
  const qualification = await processQualificationRepository.getProcessQualification(id, type);

  return {
    statusCode: 200,
    body: qualification,
  };
};

module.exports = {
  getProcess,
  saveProcess,
  getProcessById,
  getProcessByMacro,
  getProcessSocio
}