import JwtManager from '../../infrastructure/security/jwt-manager';
import CategoryProcessRepository from '../../infrastructure/orm/repositories/category-process'
import GetCategoryProcessUC from '../../application/use-cases/categoryProcess/categoryProcess';

const getCategoryProcess = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const categoryProcessRepository = new CategoryProcessRepository();
  const jwt = new JwtManager();
  const useCase = new GetCategoryProcessUC({
    categoryProcessRepository,
    jwt,
  });

  const categoryProcess = await useCase.getCategoryProcess(language);

  return {
    statusCode: 200,
    body: categoryProcess,
  };
};

const getCategoryProcessById = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  const categoryProcessRepository = new CategoryProcessRepository();
  const jwt = new JwtManager();
  const useCase = new GetCategoryProcessUC({
    categoryProcessRepository,
    jwt,
  });

  const categoryProcess = await useCase.getCategoryProcessById({ id, }, language);

  return {
    statusCode: 200,
    body: categoryProcess,
  };
};

module.exports = {
  getCategoryProcess,
  getCategoryProcessById,
}