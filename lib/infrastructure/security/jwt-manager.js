import jwt from 'jsonwebtoken';
import { InvalidPropertyError } from '../helpers/errors';
import config from '../config/env';

class JwtManager {
  constructor() {
    this.defaultKey = config.JWT.KEY;
  }

  sign(payload, key = this.defaultKey) {
    return jwt.sign(payload,
      key);
  }

  verify(token, key = this.defaultKey) {
    try {
      return jwt.verify(token,
        key);
    } catch (error) {
      throw new InvalidPropertyError('Bad token.',
        'token');
    }
  }

  validate(token, key = this.defaultKey) {
    try {
      return jwt.verify(token,
        key);
    } catch (error) {
      return false;
    }
  }
}

export default JwtManager;
