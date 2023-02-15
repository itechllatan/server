import PlansActionControlsUC from '../../application/use-cases/plans-action-controls/plans-action-controls';
import PlansActionControlsRepository from '../../infrastructure/orm/repositories/plans-action-controls';

const getPlansActionControlsById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const plansActionControlsRepository = new PlansActionControlsRepository();
  const useCase = new PlansActionControlsUC({ plansActionControlsRepository, });

  const data = await useCase.getPlansActionControlsById(id);
  return {
    statusCode: 200,
    body: data
  }
};

const savePlansActionControls = async function (httpRequest) {
  const plansActionControlsRepository = new PlansActionControlsRepository();
  const useCase = new PlansActionControlsUC({ plansActionControlsRepository, });

  const saveInfo = await useCase.savePlansActionControls(httpRequest.body, httpRequest.user);
  return {
    statusCode: 201,
    body: saveInfo,
  };
};

const deletePlansActionControls = async function (httpRequest) {
  try {
    const { id } = httpRequest.params;
    if (!id) {
      return {
        statusCode: 400,
        message: "Parametro Id es requerido"
      }
    }

    const plansActionControlsRepository = new PlansActionControlsRepository();
    const useCase = new PlansActionControlsUC({ plansActionControlsRepository, });
    const deleteElemet = await useCase.deletePlansActionControls(id, httpRequest.user);

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
  } catch (e) {
    console.log(e)
    return { statusCode: 400, body: e }
  }
};

module.exports = {
  getPlansActionControlsById,
  savePlansActionControls,
  deletePlansActionControls
}