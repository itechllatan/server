import SubprocessUC from '../../application/use-cases/subprocess/subprocess'
import SubprocessRepository from '../../infrastructure/orm/repositories/subprocess';
import SubprocessRiskUC from '../../application/use-cases/subprocess-risk/subprocess-risk';
import SubprocessRiskRepository from '../../infrastructure/orm/repositories/subprocess-risk';

const getSubprocess = async function (httpRequest) {
  const subprocessRepository = new SubprocessRepository();
  const useCase = new SubprocessUC({ subprocessRepository, });

  const subprocess = await useCase.getSubprocess();

  return {
    statusCode: 200,
    body: subprocess,
  };
};

const getSubprocessById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const subprocessRepository = new SubprocessRepository();
  const useCase = new SubprocessUC({ subprocessRepository, });

  const subprocess = await useCase.getSubprocessById(id);

  return {
    statusCode: 200,
    body: subprocess,
  };
};

const saveSubprocess = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const subprocessRepository = new SubprocessRepository();
  const useCase = new SubprocessUC({
    subprocessRepository,
  });

  const subprocess = await useCase.saveSubprocess(httpRequest.body, httpRequest.user, language);
  return {
    statusCode: 201,
    body: subprocess,
  };
};

const getSubprocessByProcess = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const subprocessRepository = new SubprocessRepository();
  const useCase = new SubprocessUC({ subprocessRepository, });

  const subprocess = await useCase.getSubprocessByProcess(id, httpRequest.query);

  return {
    statusCode: 200,
    body: subprocess,
  };
};

const getSubprocessText = async function (httpRequest) {
  const { text } = httpRequest.params;
  if (!text) {
    return {
      statusCode: 400,
      message: "Parametro Texto es requerido"
    }
  }

  const subprocessRepository = new SubprocessRepository();
  const useCase = new SubprocessUC({ subprocessRepository, });

  const subprocess = await useCase.getSubprocessText(text);

  return {
    statusCode: 200,
    body: subprocess,
  };
};

const deleteSubprocess = async function (httpRequest) {
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

  if (data.length === 0) {
    const subprocessRepository = new SubprocessRepository();
    const useCase = new SubprocessUC({ subprocessRepository, });
    const deleteElemet = await useCase.deleteSubprocess(id, httpRequest.user);

    if (deleteElemet.raw === 0) {
      return {
        statusCode: 400,
        body: { message: 'No se pudo eliminar el subproceso' }
      };
    } else {
      return {
        statusCode: 200,
        body: { message: 'Subproceso eliminado' }
      };
    }
  } else {
    return {
      statusCode: 400,
      body: { message: 'El subproceso tiene riesgos relacionados' }
    };
  }
};

module.exports = {
  getSubprocess,
  saveSubprocess,
  getSubprocessById,
  getSubprocessByProcess,
  getSubprocessText,
  deleteSubprocess
}