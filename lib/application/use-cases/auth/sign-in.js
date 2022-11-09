import User from '../../domain/user';
import config from '../../../infrastructure/config/env';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import bcrypt from 'bcryptjs';
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';

const message = messages.auth.sign_in;
const message_en = messages_en.auth.sign_in;

class SignInUC {
  constructor({ usersRepository, jwt }) {
    this.usersRepository = usersRepository;
    this.jwt = jwt;
  }

  async signIn(userInfo, adminLogin, language) {
    const mess = language && language === 'en' ? message_en : message;
    this.userInfo = new User({
      validators: {},
      ...userInfo,
    });

    const user = await this.usersRepository.findDataToLog(this.userInfo.email);
    if (!user) {
      throw new UnauthorizedError(mess.no_user,
        'credentials',
        'incorrect');
    }

    if (!user.password) {
      throw new ForbiddenError(mess.no_pass,
        'password',
        'incorrect');
    }
    if (!bcrypt.compareSync(this.userInfo.password,
      user.password)) {
      throw new UnauthorizedError(
        mess.unauthorizedError,
        'credentials',
        'incorrect'
      );
    }
    if (user.deleted_at) {
      throw new ForbiddenError(mess.user_deleted_at,
        'user',
        'activation');
    }

    delete user.password;

    const token = this.jwt.sign(
      {
        id_user: user.id_user,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, //two hours expiration
      },
      config.JWT.KEY
    );

    const refreshToken = this.jwt.sign(
      {
        id_user: user.id_user,
        email: user.email,
        //exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6, //six hours expiration
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, //six hours expiration
      },
      config.JWT.REFRESH
    );
    
    return {
      token,
      refreshToken,
      user,
    };
  }
}

export default SignInUC;
