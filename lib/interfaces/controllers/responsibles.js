import ResponsiblesUC from '../../application/use-cases/responsibles/responsibles';
import ResponsiblesRepository from '../../infrastructure/orm/repositories/responsibles';
import ControlsResponsibleUC from '../../application/use-cases/controls-responsible/controls-responsible';
import ControlsResponsibleRepository from '../../infrastructure/orm/repositories/controls-responsible';
import MacroprocessResponsibleUC from '../../application/use-cases/macroprocess-responsible/macroprocess-responsible';
import MacroprocessResponsibleRepository from '../../infrastructure/orm/repositories/macroprocess-responsible';
import ProcessResponsibleUC from '../../application/use-cases/process-responsible/process-responsible';
import ProcessResponsibleRepository from '../../infrastructure/orm/repositories/process-responsible';
import SubprocessResponsibleUC from '../../application/use-cases/Subprocess-responsible/Subprocess-responsible';
import SubprocessResponsibleRepository from '../../infrastructure/orm/repositories/Subprocess-responsible';

const getResponsibles = async function (httpRequest) {
  const responsiblesRepository = new ResponsiblesRepository();
  const useCase = new ResponsiblesUC({ responsiblesRepository, });
  const responsibles = await useCase.getResponsibles(httpRequest.query);

  return {
    statusCode: 200,
    body: responsibles,
  };
};

const getResponsiblesById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }
  const responsiblesRepository = new ResponsiblesRepository();
  const useCase = new ResponsiblesUC({ responsiblesRepository, });
  const responsibles = await useCase.getResponsiblesById(id);
  return {
    statusCode: 200,
    body: responsibles
  };
};

const saveResponsibles = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const responsiblesRepository = new ResponsiblesRepository();
  const useCase = new ResponsiblesUC({ responsiblesRepository, });
  const responsibles = await useCase.saveResponsibles(httpRequest.body, language);

  return {
    statusCode: 201,
    body: responsibles,
  };
};

const deleteResponsibles = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const controlsResponsibleRepository = new ControlsResponsibleRepository();
  const useCase = new ControlsResponsibleUC({ controlsResponsibleRepository, });
  const controls = await useCase.getcontrolsResponsibleByResponsible(id);

  if (controls.length === 0) {
    const macroprocessResponsibleRepository = new MacroprocessResponsibleRepository();
    const useCase2 = new MacroprocessResponsibleUC({ macroprocessResponsibleRepository, });
    const macro = await useCase2.getMacroprocessResponsibleByResponsible(id);

    if (macro.length === 0) {
      const processResponsibleRepository = new ProcessResponsibleRepository();
      const useCase = new ProcessResponsibleUC({ processResponsibleRepository, });
      const process = await useCase.getProcessResponsibleByResponsible(id);

      if (process.length === 0) {
        const subprocessResponsibleRepository = new SubprocessResponsibleRepository();
        const useCase = new SubprocessResponsibleUC({ subprocessResponsibleRepository, });
        const subpro = await useCase.getSubprocessResponsibleByResponsible(id);
        if (subpro.length === 0) {
          const responsiblesRepository = new ResponsiblesRepository();
          const useCase = new ResponsiblesUC({ responsiblesRepository, });
          const deleteElemet = await useCase.deleteResponsibles(id, httpRequest.user);

          if (deleteElemet.raw === 0) {
            return {
              statusCode: 400,
              body: { message: 'No se pudo eliminar el representate' }
            };
          } else {
            return {
              statusCode: 200,
              body: { message: 'Representante eliminado' }
            };
          }
        } else {
          return {
            statusCode: 400,
            body: { message: 'El responsable tiene subprocesos relacionados' }
          };
        }
      } else {
        return {
          statusCode: 400,
          body: { message: 'El responsable tiene procesos relacionados' }
        };
      }
    } else {
      return {
        statusCode: 400,
        body: { message: 'El responsable tiene macroprocesos relacionados' }
      };
    }
  } else {
    return {
      statusCode: 400,
      body: { message: 'El responsable tiene controles relacionados' }
    };
  }
};

module.exports = {
  getResponsibles,
  getResponsiblesById,
  saveResponsibles,
  deleteResponsibles
}