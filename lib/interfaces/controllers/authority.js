import AuthorityUC from '../../application/use-cases/users/authority';
import AuthorityRepository from '../../infrastructure/orm/repositories/authority';

const getAuthority = async function (httpRequest) {
  const authorityRepository = new AuthorityRepository();
  const useCase = new AuthorityUC({ authorityRepository, });

  const authority = await useCase.getAuthority();

  return {
    statusCode: 200,
    body: authority,
  };
};

const saveAuthority = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const authorityRepository = new AuthorityRepository();
  const useCase = new AuthorityUC({ authorityRepository, });

  const authority = await useCase.saveAuthority(httpRequest.body, httpRequest.user, language);

  return {
    statusCode: 201,
    body: authority,
  };
};

module.exports = {
  getAuthority,
  saveAuthority,
}