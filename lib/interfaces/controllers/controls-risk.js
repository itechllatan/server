import ControlsRiskUC from '../../application/use-cases/controls/controls-risk';
import ControlsRiskRepository from '../../infrastructure/orm/repositories/controls-risk';
import FrequencyRiskRepository from '../../infrastructure/orm/repositories/frequency-risk';
import ImpactRiskRepository from '../../infrastructure/orm/repositories/impact-risk';
import MatrixRepository from '../../infrastructure/orm/repositories/matrix';
import RiskHeatMapRepository from '../../infrastructure/orm/repositories/risk-heat-map';


const getControlsRiskById = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const controlsRiskRepository = new ControlsRiskRepository();
  const useCase = new ControlsRiskUC({
    controlsRiskRepository,
  });

  const data = await useCase.getControlsRiskById(id, language);
  return {
    statusCode: 200,
    body: data
  }
};

const saveControlsRisk = async function (httpRequest) {
  try {

    const language = httpRequest.headers?.Language;
    const controlsRiskRepository = new ControlsRiskRepository();
    const frequencyRiskRepository = new FrequencyRiskRepository();
    const impactRiskRepository = new ImpactRiskRepository();
    const matrixRepository = new MatrixRepository();
    const riskHeatMapRepository = new RiskHeatMapRepository();
    const useCase = new ControlsRiskUC({
      controlsRiskRepository,
      frequencyRiskRepository,
      impactRiskRepository,
      matrixRepository,
      riskHeatMapRepository
    });

    const saveInfo = await useCase.saveControlsRisk(httpRequest.body, httpRequest.user, language);
    return {
      statusCode: 201,
      body: saveInfo,
    };
  } catch (e) {
    console.log(e)
    return {
      statusCode: 400,
      body: e
    }
  }
};

const deleteControlsRisk = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }
  console.log('deleteControlsRisk', id)

  const controlsRiskRepository = new ControlsRiskRepository();
  const useCase = new ControlsRiskUC({ controlsRiskRepository, });
  const deleteElemet = await useCase.deleteControlsRisk(id);

  if (deleteElemet.raw === 0) {
    return {
      statusCode: 400,
      body: { message: 'No se pudo eliminar la relación' }
    };
  } else {
    return {
      statusCode: 200,
      body: { message: 'Realción eliminada' }
    };
  }
};

module.exports = {
  getControlsRiskById,
  saveControlsRisk,
  deleteControlsRisk,
}