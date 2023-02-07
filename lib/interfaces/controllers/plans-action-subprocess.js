import PlansActionSubprocessUC from '../../application/use-cases/plans-action/plans-action-subprocess';
import PlansActionSubprocessRepository from '../../infrastructure/orm/repositories/plans-action-subprocess';

const getPlansActionSubprocessById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const plansActionSubprocessRepository = new PlansActionSubprocessRepository();
  const useCase = new PlansActionSubprocessUC({ plansActionSubprocessRepository, });

  const data = await useCase.getPlansActionSubprocessById(id);
  return {
    statusCode: 200,
    body: data
  }
};

const savePlansActionSubprocess = async function (httpRequest) {
  const plansActionSubprocessRepository = new PlansActionSubprocessRepository();
  const useCase = new PlansActionSubprocessUC({ plansActionSubprocessRepository, });

  const saveInfo = await useCase.savePlansActionSubprocess(httpRequest.body, httpRequest.user);
  return {
    statusCode: 201,
    body: saveInfo,
  };
};

const deletePlansActionSubprocess = async function (httpRequest) {
  try {
    const { id } = httpRequest.params;
    if (!id) {
      return {
        statusCode: 400,
        message: "Parametro Id es requerido"
      }
    }

    const plansActionSubprocessRepository = new PlansActionSubprocessRepository();
    const useCase = new PlansActionSubprocessUC({ plansActionSubprocessRepository, });
    const deleteElemet = await useCase.deletePlansActionSubprocess(id, httpRequest.user);

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
  getPlansActionSubprocessById,
  savePlansActionSubprocess,
  deletePlansActionSubprocess
}