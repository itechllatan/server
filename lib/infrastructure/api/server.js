import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from '../../interfaces/routes';
import cors from 'cors';
import { createNamespace } from 'cls-hooked';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const compression = require('compression');

const namespace = createNamespace('session');

const path = require('path');

// Swagger definition
const swaggerDef = {
  info: {
    title: 'API Matriz de Riesgos',
  },
  host: process.env.BASE_URL || 'localhost:5000',
  basePath: '/api',
};
// Swagger opts
const options = {
  swaggerDefinition: swaggerDef,
  apis: ['**/docs/routes/*.yaml'],
};

const createServer = async () => {
  function handleContext(req, res, next) {
    namespace.bindEmitter(req);
    namespace.run(function () {
      next();
      //Require Cors
      //res.setHeader('Access-Control-Allow-Origin','*');
      //End Cors
    });
  }
  const app = express();
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json({ limit: '50mb', extended: true }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(handleContext);
  //Set Access control for non-blocking CORS
  // app.use(async (req, res, next) => {
  //   await next();
  // res.setHeader('Access-Control-Allow-Origin',
  //   '*');
  // });

  const swaggerSpec = swaggerJSDoc(options);
  const env = process.env.NODE_ENV === 'dev' ? '/api' : '/' + process.env.NODE_ENV;
  app.use(`${env}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec));

  app.use(`${env}`, routes);

  //rutas para los reportes
  //app.use('/static', express.static('files/report'));
  const reportPath = path.join(__dirname, 'files', 'report');
  console.log('reportPath', reportPath)
  app.use('/static', express.static(reportPath));

  if (!process.env.PORT) {
    process.env.PORT = 5000;
  }
  return app.listen(process.env.PORT);
};

module.exports = createServer;