import ControlsResponsibleUC from '../../application/use-cases/controls-responsible/controls-responsible';
import ControlsResponsibleRepository from '../../infrastructure/orm/repositories/controls-responsible';

const getControlsResponsibleById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const controlsResponsibleRepository = new ControlsResponsibleRepository();
  const useCase = new ControlsResponsibleUC({ controlsResponsibleRepository, });

  const data = await useCase.getcontrolsResponsibleById(id);
  return {
    statusCode: 200,
    body: data
  }
};

const saveControlsResponsible = async function (httpRequest) {
  const controlsResponsibleRepository = new ControlsResponsibleRepository();
  const useCase = new ControlsResponsibleUC({ controlsResponsibleRepository, });

  const saveInfo = await useCase.saveControlsResponsible(httpRequest.body, httpRequest.user);
  return {
    statusCode: 201,
    body: saveInfo,
  };
};

const deleteControlsResponsible = async function (httpRequest) {
  try {
    const { id } = httpRequest.params;
    if (!id) {
      return {
        statusCode: 400,
        message: "Parametro Id es requerido"
      }
    }

    const controlsResponsibleRepository = new ControlsResponsibleRepository();
    const useCase = new ControlsResponsibleUC({ controlsResponsibleRepository, });
    const deleteElemet = await useCase.deleteControlsResponsible(id, httpRequest.user);

    console.log('deleteElemet', deleteElemet)
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
  } catch (e) {
    console.log(e)
    return { statusCode: 400, body: e }
  }
};

module.exports = {
  getControlsResponsibleById,
  saveControlsResponsible,
  deleteControlsResponsible
}