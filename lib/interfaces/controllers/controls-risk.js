import ControlsRiskUC from '../../application/use-cases/controls/controls-risk';
import ControlsRiskRepository from '../../infrastructure/orm/repositories/controls-risk';


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
  try{

    const language = httpRequest.headers?.Language;
    const controlsRiskRepository = new ControlsRiskRepository();
    const useCase = new ControlsRiskUC({
      controlsRiskRepository,
    });
    
    const saveInfo = await useCase.saveControlsRisk(httpRequest.body, language);
    return {
      statusCode: 201,
      body: saveInfo,
    };
  }catch(e){
    console.log(e)
    return{
      statusCode: 400,
      body: e
    }
  }
};


module.exports = {
  getControlsRiskById,
  saveControlsRisk,
}