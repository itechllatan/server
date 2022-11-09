import JwtManager from '../../infrastructure/security/jwt-manager';
import TypeProcessRepository from '../../infrastructure/orm/repositories/type-process'
import GetTypeProcessUC from '../../application/use-cases/typeProcess/typeProcess';

const getTypeProcess = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const typeProcessRepository = new TypeProcessRepository();
  const jwt = new JwtManager();
  const useCase = new GetTypeProcessUC({
    typeProcessRepository,
    jwt,
  });

  const typeProcess = await useCase.getTypeProcess(language);

  return {
    statusCode: 200,
    body: typeProcess,
  };
};

const getTypeProcessById = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  const typeProcessRepository = new TypeProcessRepository();
  const jwt = new JwtManager();
  const useCase = new GetTypeProcessUC({
    typeProcessRepository,
    jwt,
  });

  const typeProcess = await useCase.getTypeProcessById({ id, }, language);

  return {
    statusCode: 200,
    body: typeProcess,
  };
};

module.exports = {
  getTypeProcess,
  getTypeProcessById,
}