import GetProcessUC from '../../application/use-cases/process/get-process'
import ProcessRepository from '../../infrastructure/orm/repositories/process';
import ProcessRiskUC from '../../application/use-cases/process-risk/process-risk';
import ProcessRiskRepository from '../../infrastructure/orm/repositories/process-risk';
import SubprocessUC from '../../application/use-cases/subprocess/subprocess'
import SubprocessRepository from '../../infrastructure/orm/repositories/subprocess';

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

  const process = await useCase.getProcessByMacro(id, httpRequest.query);

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

const deleteProcess = async function (httpRequest) {
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
  const data = await useCase.getProcessRiskByProcess(id, language);

  if (data.length === 0) {
    const subprocessRepository = new SubprocessRepository();
    const useCase = new SubprocessUC({ subprocessRepository, });
    const subprocess = await useCase.getSubprocessByProcess(id, '');

    if (subprocess[0].length === 0) {
      const processRepository = new ProcessRepository();
      const useCase = new GetProcessUC({ processRepository, });
      const deleteElemet = await useCase.deleteProcess(id, httpRequest.user);

      if (deleteElemet.raw === 0) {
        return {
          statusCode: 400,
          body: { message: 'No se pudo eliminar el proceso' }
        };
      } else {
        return {
          statusCode: 200,
          body: { message: 'Proceso eliminado' }
        };
      }

    } else {
      return {
        statusCode: 400,
        body: { message: 'El proceso tiene procesos relacionados' }
      };
    }
  } else {
    return {
      statusCode: 400,
      body: { message: 'El proceso tiene riesgos relacionados' }
    };
  }
};

module.exports = {
  getProcess,
  saveProcess,
  getProcessById,
  getProcessByMacro,
  getProcessSocio,
  deleteProcess
}