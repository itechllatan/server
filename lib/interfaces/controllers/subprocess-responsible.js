import SubprocessResponsibleUC from '../../application/use-cases/Subprocess-responsible/Subprocess-responsible';
import SubprocessResponsibleRepository from '../../infrastructure/orm/repositories/Subprocess-responsible';

const getSubprocessResponsibleById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const subprocessResponsibleRepository = new SubprocessResponsibleRepository();
  const useCase = new SubprocessResponsibleUC({ subprocessResponsibleRepository, });

  const data = await useCase.getSubprocessResponsibleById(id);
  return {
    statusCode: 200,
    body: data
  }
};

const saveSubprocessResponsible = async function (httpRequest) {
  const subprocessResponsibleRepository = new SubprocessResponsibleRepository();
  const useCase = new SubprocessResponsibleUC({ subprocessResponsibleRepository, });

  const saveInfo = await useCase.saveSubprocessResponsible(httpRequest.body, httpRequest.user);
  return {
    statusCode: 201,
    body: saveInfo,
  };
};

const deleteSubprocessResponsible = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const subprocessResponsibleRepository = new SubprocessResponsibleRepository();
  const useCase = new SubprocessResponsibleUC({ subprocessResponsibleRepository, });
  const deleteElemet = await useCase.deleteSubprocessResponsible(id, httpRequest.user);

  if (deleteElemet.raw === 0) {
    return {
      statusCode: 400,
      body: { message: 'No se pudo eliminar la relación' }
    };
  } else {
    return {
      statusCode: 200,
      body: { message: 'Realción eliminada' }
    };
  }
};

module.exports = {
  getSubprocessResponsibleById,
  saveSubprocessResponsible,
  deleteSubprocessResponsible
}