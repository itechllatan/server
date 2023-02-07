import PlansActionMacroProcessUC from '../../application/use-cases/plans-action/plans-action-macroprocess';
import PlansActionMacroProcessRepository from '../../infrastructure/orm/repositories/plans-action-macroprocess';

const getPlansActionMacroProcessById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const plansActionMacroProcessRepository = new PlansActionMacroProcessRepository();
  const useCase = new PlansActionMacroProcessUC({ plansActionMacroProcessRepository, });

  const data = await useCase.getPlansActionMacroProcessById(id);
  return {
    statusCode: 200,
    body: data
  }
};

const savePlansActionMacroProcess = async function (httpRequest) {
  const plansActionMacroProcessRepository = new PlansActionMacroProcessRepository();
  const useCase = new PlansActionMacroProcessUC({ plansActionMacroProcessRepository, });

  const saveInfo = await useCase.savePlansActionMacroProcess(httpRequest.body, httpRequest.user);
  return {
    statusCode: 201,
    body: saveInfo,
  };
};

const deletePlansActionMacroProcess = async function (httpRequest) {
  try {
    const { id } = httpRequest.params;
    if (!id) {
      return {
        statusCode: 400,
        message: "Parametro Id es requerido"
      }
    }

    const plansActionMacroProcessRepository = new PlansActionMacroProcessRepository();
    const useCase = new PlansActionMacroProcessUC({ plansActionMacroProcessRepository, });
    const deleteElemet = await useCase.deletePlansActionMacroProcess(id, httpRequest.user);

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
  } catch (e) {
    console.log(e)
    return { statusCode: 400, body: e }
  }
};

module.exports = {
  getPlansActionMacroProcessById,
  savePlansActionMacroProcess,
  deletePlansActionMacroProcess
}