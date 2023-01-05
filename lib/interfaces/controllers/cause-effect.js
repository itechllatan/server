import CauseEffectUC from '../../application/use-cases/cause-effect/cause-effect';
import CauseEffectRepository from '../../infrastructure/orm/repositories/cause-effect';
import RiskCauseEffectUC from '../../application/use-cases/cause-effect/risk-cause-effect';
import RiskCauseEffectRepository from '../../infrastructure/orm/repositories/risk-cause-effect';

const getCauseEffect = async function (httpRequest) {
  const causeEffectRepository = new CauseEffectRepository();
  const useCase = new CauseEffectUC({ causeEffectRepository, });

  const causeEffect = await useCase.getCauseEffect();

  return {
    statusCode: 200,
    body: causeEffect,
  };
};

const saveCauseEffect = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const causeEffectRepository = new CauseEffectRepository();
  const useCase = new CauseEffectUC({ causeEffectRepository, });

  const causeEffect = await useCase.saveCauseEffect(httpRequest.body, language);

  return {
    statusCode: 201,
    body: causeEffect,
  };
};

const getRiskCauseEffect = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const riskCauseEffectRepository = new RiskCauseEffectRepository();
  const useCase = new RiskCauseEffectUC({ riskCauseEffectRepository, });
  const riskCC = await useCase.getRiskCauseEffect(id);
  return {
    statusCode: 200,
    body: riskCC,
  };
};

const saveRiskCauseEffect = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const riskCauseEffectRepository = new RiskCauseEffectRepository();
  const useCase = new RiskCauseEffectUC({ riskCauseEffectRepository, });

  const riskCC = await useCase.saveRiskCauseEffect(httpRequest.body, language);

  return {
    statusCode: 201,
    body: riskCC,
  };
};



module.exports = {
  getCauseEffect,
  saveCauseEffect,
  getRiskCauseEffect,
  saveRiskCauseEffect
}