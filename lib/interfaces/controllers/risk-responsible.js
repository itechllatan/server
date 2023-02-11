import RiskResponsibleUC from '../../application/use-cases/risk-responsible/risk-responsible';
import RiskResponsibleRepository from '../../infrastructure/orm/repositories/risk-responsible';

const getResponsibleByRiskHeatMap = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }
  const riskResponsibleRepository = new RiskResponsibleRepository();
  const useCase = new RiskResponsibleUC({ riskResponsibleRepository, });

  const riskResponsibles = await useCase.getResponsibleByRiskHeatMap(id);

  return {
    statusCode: 200,
    body: riskResponsibles,
  };
};

const saveRiskResponsible = async function (httpRequest){
    const language = httpRequest.headers?.Language;
    const riskResponsibleRepository = new RiskResponsibleRepository();
    const useCase = new RiskResponsibleUC({ riskResponsibleRepository, });

    const riskFactorRisk = await useCase.saveRiskResponsible(httpRequest.body, httpRequest.user, language);
    return {
        statusCode: 201,
        body: riskFactorRisk,
    };
}

module.exports = {
    getResponsibleByRiskHeatMap,
    saveRiskResponsible
}