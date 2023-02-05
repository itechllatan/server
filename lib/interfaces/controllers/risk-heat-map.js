import RiskHeatMap from '../../application/use-cases/risk-heat-map/risk-heat-map';
import RiskHeatMapRepository from '../../infrastructure/orm/repositories/risk-heat-map';
import PlansActionRepository from '../../infrastructure/orm/repositories/plans-action';
import ControlsRepository from '../../infrastructure/orm/repositories/controls';
import ProcessRepository from '../../infrastructure/orm/repositories/process';
import MatrixRepository from '../../infrastructure/orm/repositories/matrix';

const getDashboardByRiskHeatMap = async function (httpRequest) {
    const { id } = httpRequest.params;
    if (!id) {
        return {
        statusCode: 400,
        message: "Parametro Id es requerido"
        }
    }
    try{
        const riskHeatMapRepository = new RiskHeatMapRepository();
        const plansActionRepository = new PlansActionRepository();
        const controlsRepository = new ControlsRepository();
        const processRepository = new ProcessRepository();
        const matrixRepository = new MatrixRepository();
        const useCase = new RiskHeatMap({
            riskHeatMapRepository,
            plansActionRepository,
            controlsRepository,
            processRepository,
            matrixRepository
        });
    
        const risks = await useCase.getDashboardByRiskHeatMap(id);

        return {
        statusCode: 200,
        body: risks,
        };
    }catch(e){
        console.log(e)
        return { statusCode: 400, body: e}
    }
};

const deleteById = async function (httpRequest){
    console.log(httpRequest.params)
    console.log(httpRequest.user)
    try{
      const { id } = httpRequest.params;
      if(!id) return { statusCode: 400, message: "Parametro Id es requerido"}
      const riskHeatMapRepository = new RiskHeatMapRepository();
      const useCase = new RiskHeatMap({
        riskHeatMapRepository
      })
      const plans = await useCase.deleteById(id, httpRequest.user);
      return {
        statusCode: 204,
        body: plans
      }
    }catch(e){
        console.log(e)
      return { statusCode: 400, body: e}
    }
  }

module.exports = {
    getDashboardByRiskHeatMap,
    deleteById
}