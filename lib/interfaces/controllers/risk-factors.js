import RiskFactorsUC from '../../application/use-cases/risk-factors/risk-factors-master';
import RiskFactorsMasterRepository from '../../infrastructure/orm/repositories/risk-factors-master';
import RiskFactorRiskUC from '../../application/use-cases/risk-factor-risk/risk-factor-risk';
import RiskFactorRiskRepository from '../../infrastructure/orm/repositories/risk-factors-risk';

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

const deleteRiskFactorsMaster = async function (httpRequest) {
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


  if (riskFactors.length === 0) {
    const riskFactorsMasterRepository = new RiskFactorsMasterRepository();
    const useCase = new RiskFactorsUC({ riskFactorsMasterRepository, });
    const deleteElemet = await useCase.deleteRiskFactorsMaster(id, httpRequest.user);

    if (deleteElemet.raw === 0) {
      return {
        statusCode: 400,
        body: { message: 'No se pudo eliminar el factor' }
      };
    } else {
      return {
        statusCode: 200,
        body: { message: 'Factor eliminado' }
      };
    }
  } else {
    return {
      statusCode: 400,
      body: { message: 'El factor tiene riesgos relacionados' }
    };
  }
};

module.exports = {
  getRiskFactorsMaster,
  saveRiskFactorsMaster,
  deleteRiskFactorsMaster,
}