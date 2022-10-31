import JwtManager from '../../infrastructure/security/jwt-manager';

const signIn = async function (httpRequest) {
    const { email, password } = httpRequest.body;
    const language = httpRequest.headers?.Language;
    const adminLogin = false;
    //const usersRepository = new UsersRepository();
    const jwt = new JwtManager();
    /*const useCase = new SignInUC({
      usersRepository,
      jwt,
    });*/
  
    /*const user = await useCase.signIn({ email, password },
      adminLogin,
      language);*/
    const user = {
        "id": 1,
        "user": "squiroz",
        "name":"Sebastian Quiroz",
        "birthday": "01/09/1997"
    }
    return {
      statusCode: 200,
      body: user,
    };
  };

module.exports = {
    signIn,
}