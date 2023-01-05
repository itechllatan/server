import RiskFactorsUC from '../../application/use-cases/risk-factors/risk-factors-master';
import RiskFactorsMasterRepository from '../../infrastructure/orm/repositories/risk-factors-master';

const getRiskFactorsMaster = async function (httpRequest) {
  const riskFactorsMasterRepository = new RiskFactorsMasterRepository();
  const useCase = new RiskFactorsUC({ riskFactorsMasterRepository, });

  const riskFactors = await useCase.getRiskFactorsMaster();

  return {
    statusCode: 200,
    body: riskFactors,
  };
};

const saveRiskFactorsMaster = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const riskFactorsMasterRepository = new RiskFactorsMasterRepository();
  const useCase = new RiskFactorsUC({ riskFactorsMasterRepository, });

  const riskFactors = await useCase.saveRiskFactorsMaster(httpRequest.body, language);

  return {
    statusCode: 201,
    body: riskFactors,
  };
};

module.exports = {
  getRiskFactorsMaster,
  saveRiskFactorsMaster,
}