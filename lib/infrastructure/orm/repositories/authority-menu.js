import CommonRepository from './common';
import AuthorityMenuSchema from '../schemas/authority-menu';
import { getConnection, getRepository } from "typeorm";

class AuthorityMenuRepository extends CommonRepository {
  constructor() {
    super(AuthorityMenuSchema);
    this.conn = getRepository(AuthorityMenuSchema)
  }

  async validateRoute (url, idUser){
    const builder = getConnection()
      .createQueryBuilder()
      .select(['authority_menu','menu','authority','userAuthorities','user'])
      .from('authority_menu', 'authority_menu')
      .leftJoin('authority_menu.menu', 'menu')
      .leftJoin('authority_menu.authority', 'authority')
      .leftJoin('authority.userAuthorities', 'userAuthorities')
      .leftJoin('userAuthorities.user', 'user')
      .where('menu.url = :url', {url})
      .andWhere('user.id_user = :idUser', { idUser })
      .cache(true);
    return await builder.getMany();
    
  }
}

export default AuthorityMenuRepository;
