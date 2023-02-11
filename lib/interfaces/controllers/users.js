import UsersUC from '../../application/use-cases/users/users';
import UsersRepository from '../../infrastructure/orm/repositories/users';
import UserAuthorityRepository from '../../infrastructure/orm/repositories/user-authority';

const getUsers = async function (httpRequest) {
  const usersRepository = new UsersRepository();
  const useCase = new UsersUC({ usersRepository, });

  const users = await useCase.getUsers(httpRequest.query);

  return {
    statusCode: 200,
    body: users,
  };
};

const saveUsers = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const usersRepository = new UsersRepository();
  const userAuthorityRepository = new UserAuthorityRepository();
  const useCase = new UsersUC({ usersRepository, userAuthorityRepository });

  const users = await useCase.saveUsers(httpRequest.body, httpRequest.user, language);

  return {
    statusCode: 201,
    body: users,
  };
};

module.exports = {
  getUsers,
  saveUsers,
}