import Risk from '../../application/use-cases/risk/risk';
import RiskRepository from '../../infrastructure/orm/repositories/risk';
import RiskHeatMapRepository from '../../infrastructure/orm/repositories/risk-heat-map';
import RiskVariableFrequencyRepository from '../../infrastructure/orm/repositories/risk-variable-frequency';
import RiskVariableImpactRepository from '../../infrastructure/orm/repositories/risk-variable-impact';
import ControlsRiskRepository from '../../infrastructure/orm/repositories/controls-risk';
import PlanActionRiskRepository from '../../infrastructure/orm/repositories/plans-action-risk';
import FrequencyRiskRepository from '../../infrastructure/orm/repositories/frequency-risk';
import ImpactRiskRepository from '../../infrastructure/orm/repositories/impact-risk';
import MatrixRepository from '../../infrastructure/orm/repositories/matrix';

const getRisks = async function () {
  try {
    const riskRepository = new RiskRepository();
    const frequencyRiskRepository = new FrequencyRiskRepository();
    const impactRiskRepository = new ImpactRiskRepository();
    const matrixRepository = new MatrixRepository();
    const useCase = new Risk({
      riskRepository,
      frequencyRiskRepository,
      impactRiskRepository,
      matrixRepository
    });

    const risks = await useCase.getRisks();

    return {
      statusCode: 200,
      body: risks,
    };
  } catch (e) {
    console.log(e)
    return { statusCode: 400, body: e }
  }
};

const insertRisk = async function (httpRequest) {
  const riskRepository = new RiskRepository();
  const riskHeatMapRepository = new RiskHeatMapRepository();
  const riskVariableFrequencyRepository = new RiskVariableFrequencyRepository();
  const riskVariableImpactRepository = new RiskVariableImpactRepository();
  const useCase = new Risk({
    riskRepository,
    riskHeatMapRepository,
    riskVariableFrequencyRepository,
    riskVariableImpactRepository
  });

  const risk = await useCase.insertRisk(httpRequest.body, httpRequest.user);

  return {
    statusCode: 201,
    body: risk
  }
}

const getRiskById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }
  const riskRepository = new RiskRepository();
  const useCase = new Risk({
    riskRepository
  });

  const risk = await useCase.getRiskById(id);

  return {
    statusCode: 200,
    body: risk
  }
}

const getControlsByRiskId = async function (httpRequest) {
  try {
    const { id } = httpRequest.params;
    if (!id) return { statusCode: 400, message: "Parametro Id es requerido" }
    const controlRiskRepository = new ControlsRiskRepository();
    const useCase = new Risk({
      controlRiskRepository
    })

    const controls = await useCase.getControlsByRiskId(id);

    return {
      statusCode: 200,
      body: controls
    }
  } catch (e) {
    return { statusCode: 400, body: e }
  }
}

<<<<<<< HEAD
const getRisksText = async function (httpRequest) {
  const { text } = httpRequest.params;
  if (!text) {
    return {
      statusCode: 400,
      message: "Parametro Texto es requerido"
    }
  }

  try {
    const riskRepository = new RiskRepository();
    const frequencyRiskRepository = new FrequencyRiskRepository();
    const impactRiskRepository = new ImpactRiskRepository();
    const matrixRepository = new MatrixRepository();
    const useCase = new Risk({
      riskRepository,
      frequencyRiskRepository,
      impactRiskRepository,
      matrixRepository
    });

    const risks = await useCase.getRisksText(text);

    return {
      statusCode: 200,
      body: risks,
    };
  } catch (e) {
    console.log(e)
    return { statusCode: 400, body: e }
  }
};


=======
const getPlanActionsByRiskId = async function (httpRequest){
  try{
    const { id } = httpRequest.params;
    if(!id) return { statusCode: 400, message: "Parametro Id es requerido"}
    const planActionRiskRepository = new PlanActionRiskRepository();
    const useCase = new Risk({
      planActionRiskRepository
    })
    const plans = await useCase.getPlanActionsByRiskId(id);
    return {
      statusCode: 200,
      body: plans
    }
  }catch(e){
    return { statusCode: 400, body: e}
  }
}
>>>>>>> f66bb9886d92f53da98a128ae248a838596e1f68
module.exports = {
  getRisks,
  insertRisk,
  getRiskById,
  getControlsByRiskId,
<<<<<<< HEAD
  getRisksText
=======
  getPlanActionsByRiskId
>>>>>>> f66bb9886d92f53da98a128ae248a838596e1f68
}