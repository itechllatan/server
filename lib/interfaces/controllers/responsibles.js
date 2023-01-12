import ResponsiblesUC from '../../application/use-cases/responsibles/responsibles';
import ResponsiblesRepository from '../../infrastructure/orm/repositories/responsibles';

const getResponsibles = async function (httpRequest) {
  const responsiblesRepository = new ResponsiblesRepository();
  const useCase = new ResponsiblesUC({ responsiblesRepository, });
  const responsibles = await useCase.getResponsibles();

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

module.exports = {
  getResponsibles,
  getResponsiblesById,
  saveResponsibles,
}