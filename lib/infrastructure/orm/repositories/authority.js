import CommonRepository from './common';
import AuthoritySchema from '../schemas/authority';
import { getConnection, getRepository } from 'typeorm';

class AuthorityRepository extends CommonRepository {
  constructor() {
    super(AuthoritySchema);
    this.conn = getRepository(AuthoritySchema)
  }
}

export default AuthorityRepository;
