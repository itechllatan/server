import PlansActionRiskUC from '../../application/use-cases/plans-action/plans-action-risk';
import PlansActionRiskRepository from '../../infrastructure/orm/repositories/plans-action-risk';

const getPlansActionRiskById = async function (httpRequest) {
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
  return {
    statusCode: 200,
    body: data
  }
};

const savePlansActionRisk = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const plansActionRiskRepository = new PlansActionRiskRepository();
  const useCase = new PlansActionRiskUC({
    plansActionRiskRepository,
  });

  const saveInfo = await useCase.savePlansActionRisk(httpRequest.body, httpRequest.user, language);
  return {
    statusCode: 200,
    body: saveInfo,
  };
};

const deletePlansActionRisk = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }


  const plansActionRiskRepository = new PlansActionRiskRepository();
  const useCase = new PlansActionRiskUC({ plansActionRiskRepository, });
  const deleteElemet = await useCase.deletePlansActionRisk(id);

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
};

module.exports = {
  getPlansActionRiskById,
  savePlansActionRisk,
  deletePlansActionRisk,
}