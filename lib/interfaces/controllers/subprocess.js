import SubprocessUC from '../../application/use-cases/subprocess/subprocess'
import SubprocessRepository from '../../infrastructure/orm/repositories/subprocess';


const getSubprocess = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const subprocessRepository = new SubprocessRepository();
  const useCase = new SubprocessUC({
    subprocessRepository,
  });

  const subprocess = await useCase.getSubprocess(language);

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

  const subprocess = await useCase.saveSubprocess(httpRequest.body, language);
  return {
    statusCode: 200,
    body: subprocess,
  };
};

const getSubprocessById = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const subprocessRepository = new SubprocessRepository();
  const useCase = new SubprocessUC({
    subprocessRepository,
  });

  const subprocess = await useCase.getSubprocessById({ id, }, language);

  return {
    statusCode: 200,
    body: subprocess,
  };
};

const getSubprocessByProcess = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const subprocessRepository = new SubprocessRepository();
  const useCase = new SubprocessUC({
    subprocessRepository,
  });

  const subprocess = await useCase.getSubprocessByProcess({ id, }, language);

  return {
    statusCode: 200,
    body: subprocess,
  };
};

module.exports = {
  getSubprocess,
  saveSubprocess,
  getSubprocessById,
  getSubprocessByProcess,
}