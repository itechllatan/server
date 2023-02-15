import MacroprocessResponsibleUC from '../../application/use-cases/macroprocess-responsible/macroprocess-responsible';
import MacroprocessResponsibleRepository from '../../infrastructure/orm/repositories/macroprocess-responsible';

const getMacroprocessResponsibleById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const macroprocessResponsibleRepository = new MacroprocessResponsibleRepository();
  const useCase = new MacroprocessResponsibleUC({ macroprocessResponsibleRepository, });

  const data = await useCase.getMacroprocessResponsibleById(id);
  return {
    statusCode: 200,
    body: data
  }
};

const saveMacroprocessResponsible = async function (httpRequest) {
  const macroprocessResponsibleRepository = new MacroprocessResponsibleRepository();
  const useCase = new MacroprocessResponsibleUC({ macroprocessResponsibleRepository, });

  const saveInfo = await useCase.saveMacroprocessResponsible(httpRequest.body, httpRequest.user);
  return {
    statusCode: 201,
    body: saveInfo,
  };
};

const deleteMacroprocessResponsible = async function (httpRequest) {
  try {
    const { id } = httpRequest.params;
    if (!id) {
      return {
        statusCode: 400,
        message: "Parametro Id es requerido"
      }
    }

    const macroprocessResponsibleRepository = new MacroprocessResponsibleRepository();
    const useCase = new MacroprocessResponsibleUC({ macroprocessResponsibleRepository, });
    const deleteElemet = await useCase.deleteMacroprocessResponsible(id, httpRequest.user);

    if (deleteElemet.affected > 0) {
      return {
        statusCode: 200,
        body: { message: 'Realción eliminada' }
      };
    } else {
      return {
        statusCode: 400,
        body: { message: 'No se pudo eliminar la relación' }
      };
    }
  } catch (e) {
    console.log(e)
    return { statusCode: 400, body: e }
  }
};

module.exports = {
  getMacroprocessResponsibleById,
  saveMacroprocessResponsible,
  deleteMacroprocessResponsible
}