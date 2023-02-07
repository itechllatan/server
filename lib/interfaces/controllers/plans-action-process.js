import PlansActionProcessUC from '../../application/use-cases/plans-action/plans-action-process';
import PlansActionProcessRepository from '../../infrastructure/orm/repositories/plans-action-process';

const getPlansActionProcessById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const plansActionProcessRepository = new PlansActionProcessRepository();
  const useCase = new PlansActionProcessUC({ plansActionProcessRepository, });

  const data = await useCase.getPlansActionProcessById(id);
  return {
    statusCode: 200,
    body: data
  }
};

const savePlansActionProcess = async function (httpRequest) {
  const plansActionProcessRepository = new PlansActionProcessRepository();
  const useCase = new PlansActionProcessUC({ plansActionProcessRepository, });

  const saveInfo = await useCase.savePlansActionProcess(httpRequest.body, httpRequest.user);
  return {
    statusCode: 201,
    body: saveInfo,
  };
};

const deletePlansActionProcess = async function (httpRequest) {
  try {
    const { id } = httpRequest.params;
    if (!id) {
      return {
        statusCode: 400,
        message: "Parametro Id es requerido"
      }
    }

    const plansActionProcessRepository = new PlansActionProcessRepository();
    const useCase = new PlansActionProcessUC({ plansActionProcessRepository, });
    const deleteElemet = await useCase.deletePlansActionProcess(id, httpRequest.user);

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
  getPlansActionProcessById,
  savePlansActionProcess,
  deletePlansActionProcess
}