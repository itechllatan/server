import RiskCauseEffect from '../../application/use-cases/risk-cause-effect/risk-cause-effect';
import RiskCauseEffectRepository from "../../infrastructure/orm/repositories/risk-cause-effect";

const deleteRiskCauseEffect = async function (httpRequest){
    try{
      const { id } = httpRequest.params;
      if(!id) return { statusCode: 400, message: "Parametro Id es requerido"}
      const riskCauseEffectRepository = new RiskCauseEffectRepository();
      const useCase = new RiskCauseEffect({
        riskCauseEffectRepository
      })
      const riskCauseEffectDelete = await useCase.deleteRiskCauseEffect(id);
      return {
        statusCode: 204,
        body: riskCauseEffectDelete
      }
    }catch(e){
        console.log(e)
      return { statusCode: 400, body: e}
    }
  }

module.exports = {
    deleteRiskCauseEffect,
}