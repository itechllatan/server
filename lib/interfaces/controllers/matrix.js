import MatrixUC from '../../application/use-cases/matrix/matrix'
import MatrixRepository from '../../infrastructure/orm/repositories/matrix';
import FrequencyRepository from '../../infrastructure/orm/repositories/frequency-risk';
import ImpactRepository from '../../infrastructure/orm/repositories/impact-risk';
import HeatMapRepository from '../../infrastructure/orm/repositories/heat-map';
import RiskLevelRepository from '../../infrastructure/orm/repositories/risk-level';

const getMatrixByHeatMap = async function (httpRequest) {
  const { id } = httpRequest.params;

  if (!id ) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }
  const matrixRepository = new MatrixRepository();
  const useCase = new MatrixUC({
    matrixRepository,
  });
  const matrix = await useCase.getMatrixByHeatMap(id);
  return {
    statusCode: 200,
    body: matrix,
  };
};

const createDefaultMatrix = async function (httpRequest){
  try{
    const { name, description } = httpRequest.body;
    if(!name || !description){
      return { statusCode: 400, body:{
        message: "Faltan parametros"
      }}
    }
    const matrixRepository = new MatrixRepository();
    const frequencyRepository = new FrequencyRepository();
    const impactRepository = new ImpactRepository();
    const heatMapRepository = new HeatMapRepository();
    const riskLevelRepository = new RiskLevelRepository();
    const useCase = new MatrixUC({
      matrixRepository,
      frequencyRepository,
      impactRepository,
      heatMapRepository,
      riskLevelRepository
    })
    const matrix = await useCase.createDefaultMatrix(httpRequest.body, httpRequest.user);
  
    return {
      statusCode: 201,
      body: matrix,
    };
  }catch(error){
    return {
      statusCode: 400,
      error
    };
  }
}

const updateMatrix = async function (httpRequest){
  try{
    const { matrixToUpdate, frequencyRisk, impactRisk, riskLevel, heatMap } = httpRequest.body;
    if(!matrixToUpdate || !frequencyRisk || !impactRisk || !riskLevel || !heatMap){
      return { statusCode: 400, body:{
        message: "Faltan parametros"
      }}
    }
    const matrixRepository = new MatrixRepository();
    const frequencyRepository = new FrequencyRepository();
    const impactRepository = new ImpactRepository();
    const heatMapRepository = new HeatMapRepository();
    const riskLevelRepository = new RiskLevelRepository();
    const useCase = new MatrixUC({
      matrixRepository,
      frequencyRepository,
      impactRepository,
      heatMapRepository,
      riskLevelRepository
    })
    const matrix = await useCase.updateMatrix(httpRequest.body, httpRequest.user);
  
    return {
      statusCode: 201,
      body: matrix,
    };
  }catch(error){
    return {
      statusCode: 400,
      error
    };
  }
}
module.exports = {
  getMatrixByHeatMap,
  createDefaultMatrix,
  updateMatrix
}
