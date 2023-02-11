import CommonRepository from './common';
import UserAuthoritySchema from '../schemas/user-authority'
import { getRepository, } from 'typeorm';

class UserAuthorityRepository extends CommonRepository {
  constructor() {
    super(UserAuthoritySchema);
    this.conn = getRepository(UserAuthoritySchema)
  }
}

export default UserAuthorityRepository;
