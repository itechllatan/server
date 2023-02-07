import ProcessResponsibleUC from '../../application/use-cases/process-responsible/process-responsible';
import ProcessResponsibleRepository from '../../infrastructure/orm/repositories/process-responsible';

const getProcessResponsibleById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const processResponsibleRepository = new ProcessResponsibleRepository();
  const useCase = new ProcessResponsibleUC({ processResponsibleRepository, });

  const data = await useCase.getProcessResponsibleById(id);
  return {
    statusCode: 200,
    body: data
  }
};

const saveProcessResponsible = async function (httpRequest) {
  const processResponsibleRepository = new ProcessResponsibleRepository();
  const useCase = new ProcessResponsibleUC({ processResponsibleRepository, });

  const saveInfo = await useCase.saveProcessResponsible(httpRequest.body, httpRequest.user);
  return {
    statusCode: 201,
    body: saveInfo,
  };
};

const deleteProcessResponsible = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const processResponsibleRepository = new ProcessResponsibleRepository();
  const useCase = new ProcessResponsibleUC({ processResponsibleRepository, });
  const deleteElemet = await useCase.deleteProcessResponsible(id, httpRequest.user);

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
  getProcessResponsibleById,
  saveProcessResponsible,
  deleteProcessResponsible
}