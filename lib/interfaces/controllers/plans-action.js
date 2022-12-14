import PlansActionUC from '../../application/use-cases/plans-action/plans-action';
import PlansActionRepository from '../../infrastructure/orm/repositories/plans-action';

const getPlansAction = async function (httpRequest) {
  const plansActionRepository = new PlansActionRepository();
  const useCase = new PlansActionUC({
    plansActionRepository,
  });

  const plans = await useCase.getPlansAction();

  return {
    statusCode: 200,
    body: plans,
  };
};

const getPlansActionById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }
  const plansActionRepository = new PlansActionRepository();
  const useCase = new PlansActionUC({
    plansActionRepository,
  });

  const plans = await useCase.getPlansActionById(id);

  return {
    statusCode: 200,
    body: plans,
  };
};

const savePlansAction = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const plansActionRepository = new PlansActionRepository();
  const useCase = new PlansActionUC({
    plansActionRepository,
  });

  const plan = await useCase.savePlansAction(httpRequest.body,language);

  return {
    statusCode: 201,
    body: plan
  }
}

module.exports = {
  getPlansAction,
  getPlansActionById,
  savePlansAction,
}