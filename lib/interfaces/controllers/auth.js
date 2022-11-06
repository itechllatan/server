import JwtManager from '../../infrastructure/security/jwt-manager';
import UsersRepository from '../../infrastructure/orm/repositories/users';
import SignInUC from '../../application/use-cases/auth/sign-in';

const signIn = async function (httpRequest) {
  const { email, password } = httpRequest.body;
  const language = httpRequest.headers?.Language;
  const adminLogin = false;
  const usersRepository = new UsersRepository();
  const jwt = new JwtManager();
  const useCase = new SignInUC({
    usersRepository,
    jwt,
  });

  const user = await useCase.signIn({ email, password },
    adminLogin,
    language);
  return {
    statusCode: 200,
    body: user,
  };
};

module.exports = {
  signIn,
}