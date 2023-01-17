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
  const useCase = new PlansActionRiskUC({
    plansActionRiskRepository,
  });

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


module.exports = {
  getPlansActionRiskById,
  savePlansActionRisk,
}