import AclManager from '../security/acl-manager';

const acl = new AclManager();

module.exports = function makeExpressCallback(controller) {
  return async (req, res) => {
    try {
      const httpRequest = {
        body: req.body,
        files: req.files,
        query: req.query,
        params: req.params,
        method: req.method,
        route: req.baseUrl + req.route.path,
        headers: {
          Authorization: req.get('Authorization'),
          Language: req.get('Accept-Language'),
        },
      };

      const user = await acl.authenticate(httpRequest);
      httpRequest.user = user;

      const httpResponse = await controller(httpRequest);

      if (httpResponse.headers) {
        res.set(httpResponse.headers);
      }

      res.type('json');
      res.status(httpResponse.statusCode).send(httpResponse.body).end();
    } catch (error) {
      const {
        status = 500,
        name,
        path,
        type,
        message = 'Internal server error',
      } = error;
      console.log(error);
      res
        .status(status)
        .send({
          ...(name ? { name } : {}),
          ...(path ? { path } : {}),
          ...(type ? { type } : {}),
          ...(message ? { message } : {}),
        })
        .end();
      return;
    }
  };
};
