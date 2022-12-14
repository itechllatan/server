import VariablesLevelUC from '../../application/use-cases/variables/variables-level';
import VariablesLevelRepository from '../../infrastructure/orm/repositories/variables-level';

const getVariablesLevelById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const variablesLevelRepository = new VariablesLevelRepository();
  const useCase = new VariablesLevelUC({ variablesLevelRepository, });

  const data = await useCase.getVariablesLevelById(id);
  return {
    statusCode: 200,
    body: data,
  };
};

module.exports = {
  getVariablesLevelById,
}