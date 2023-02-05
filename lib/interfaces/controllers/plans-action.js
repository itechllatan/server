import PlansActionUC from '../../application/use-cases/plans-action/plans-action';
import PlansActionRepository from '../../infrastructure/orm/repositories/plans-action';
import PlansActionRiskUC from '../../application/use-cases/plans-action/plans-action-risk';
import PlansActionRiskRepository from '../../infrastructure/orm/repositories/plans-action-risk';

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

  const plan = await useCase.savePlansAction(httpRequest.body, httpRequest.user, language);

  return {
    statusCode: 201,
    body: plan
  }
}

const getPlansActionText = async function (httpRequest) {
  const { text } = httpRequest.params;
  if (!text) {
    return {
      statusCode: 400,
      message: "Parametro Texto es requerido"
    }
  }

  const plansActionRepository = new PlansActionRepository();
  const useCase = new PlansActionUC({
    plansActionRepository,
  });

  const plans = await useCase.getPlansActionText(text);

  return {
    statusCode: 200,
    body: plans,
  };
};

const deletePlansAction = async function (httpRequest) {
  const language = httpRequest.headers?.Language;

  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const plansActionRiskRepository = new PlansActionRiskRepository();
  const useCase = new PlansActionRiskUC({ plansActionRiskRepository, });

  const data = await useCase.getPlansActionRiskById(id, language);
  
  if (data.length === 0) {
    const plansActionRepository = new PlansActionRepository();
    const useCase = new PlansActionUC({ plansActionRepository });
    const deleteElemet = await useCase.deletePlansAction(id);

    if (deleteElemet.raw === 0) {
      return {
        statusCode: 400,
        body: { message: 'No se pudo eliminar el plan de acción' }
      };
    } else {
      return {
        statusCode: 200,
        body: { message: 'Plan de acción eliminado' }
      };
    }
  } else {
    return {
      statusCode: 400,
      body: { message: 'El plan de acción tiene riesgos relacionados' }
    };
  }
};

module.exports = {
  getPlansAction,
  getPlansActionById,
  savePlansAction,
  getPlansActionText,
  deletePlansAction,
}