import { UnauthorizedError, ForbiddenError } from '../helpers/errors';
import JwtManager from './jwt-manager';
import config from '../config/env';
import { getNamespace } from 'cls-hooked';
import nouser from './routes/no-user';
import withoutpermits from './routes/without-permits';

//import userSchema from '../orm/typeorm/schemas/user';
import { getConnection } from 'typeorm';

import messages from '../../application/use-cases/support/messages.json';
import messages_en from '../../application/use-cases/support/messages_en.json';

const message = messages.acl_manager;
const message_en = messages_en.acl_manager;

class AclManager {
  constructor() {
    this.jwt = new JwtManager();
  }

  async authenticate(httpRequest) {
    const language = httpRequest.headers.language;
    const mess = language && language === 'en' ? message_en : message;
    let rol;

    const route = httpRequest.route.replace(/^\/(tst|stg|dev-cloud|prod)\//,
      '/api/');

    if (route !== '/api/health-check/') {
      console.log('route:\n',
        route);
    }
    const validatePathNoUser = (routes, httpReq) => {
      httpReq.route = httpReq.route.replace(/^\/(tst|stg|dev-cloud|prod)\//,
        '/api/');
      return routes.some(
        url => url.resource.test(route) && url.methods.some(method => method === httpReq.method)
      );
    };

    const validatePath = async (id_user, httpReq) => {
      let authUser;

      await getConnection().transaction(async entityManager => {
        authUser = await entityManager
          .getRepository(userSchema)
          .createQueryBuilder('user')
          .leftJoin('user.authorities',
            'authorities')
          .leftJoin('authorities.authority',
            'authority')
          .leftJoin('authority.authority_permits',
            'authority_permits')
          .leftJoin('authority_permits.permits',
            'permits')
          .select('authority.label as authority')
          .where('user.id_user = :id_user',
            { id_user })
          .andWhere('permits.url = :url',
            { url: route })
          .andWhere('permits.method = :method',
            { method: httpReq.method })
          .getRawOne();
      });

      rol = authUser?.authority;

      return authUser;
    };

    if (validatePathNoUser(withoutpermits,
      httpRequest)) {
      return null;
    }

    const authorization = httpRequest.headers.Authorization;
    let user = {};

    const token = authorization?.split(' ')[1];

    const log = token ? this.jwt.validate(token,
      config.JWT.KEY) : false;

    if (!log && validatePathNoUser(nouser,
      httpRequest)) {
      return null;
    }

    user = token ? this.jwt.verify(token,
      config.JWT.KEY) : false;

    //Validate
    if (!authorization) {
      throw new UnauthorizedError(
        'The Authorization token does not exist.',
        'authorization',
        'security'
      );
    }

    try {
      const hasPermission = await validatePath(user.id_user,
        httpRequest);

      if (!hasPermission || user.rol !== rol) {
        throw new ForbiddenError(mess.no_perms,
          'authorization',
          'security');
      }

      const namespace = getNamespace('session');
      namespace.set('user',
        user);
      namespace.set('rol',
        rol);
    } catch (error) {
      throw new ForbiddenError(mess.no_perms,
        'authorization',
        'security');
    }
    return user;
  }
}

export default AclManager;
