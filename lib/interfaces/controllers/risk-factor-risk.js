import RiskFactorRiskUC from '../../application/use-cases/risk-factor-risk/risk-factor-risk';
import RiskFactorRiskRepository from '../../infrastructure/orm/repositories/risk-factors-risk';

const getRiskFactorByRiskHeatMap = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }
  const riskFactorRiskRepository = new RiskFactorRiskRepository();
  const useCase = new RiskFactorRiskUC({ riskFactorRiskRepository, });

  const riskFactors = await useCase.getRiskFactorByRiskHeatMap(id);

  return {
    statusCode: 200,
    body: riskFactors,
  };
};

const saveRiskFactorRisk = async function (httpRequest){

  const language = httpRequest.headers?.Language;
  const riskFactorRiskRepository = new RiskFactorRiskRepository();
  const useCase = new RiskFactorRiskUC({ riskFactorRiskRepository, });

  const riskFactorRisk = await useCase.saveRiskFactorRisk(httpRequest.body, httpRequest.user, language);
  return {
      statusCode: 201,
      body: riskFactorRisk,
  };
}

const deleteRiskFactorRisk = async function (httpRequest){
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }
  const riskFactorRiskRepository = new RiskFactorRiskRepository();
  const useCase = new RiskFactorRiskUC({ riskFactorRiskRepository, });

  const riskFactorRisk = await useCase.deleteRiskFactorRisk(id);

  return {
    statusCode: 204,
    body: riskFactorRisk,
  };
}

module.exports = {
    getRiskFactorByRiskHeatMap,
    saveRiskFactorRisk,
    deleteRiskFactorRisk
}