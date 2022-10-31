import fs from 'fs';
import config from '../config/env';

const dir = __dirname + '/schemas/';
const schemas = fs
  .readdirSync(dir)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .map(file => file.replace('.js',
    ''));

const dbConfig = {
  type: config.DB.TYPE,
  host: config.DB.HOST,
  port: config.DB.PORT,
  username: config.DB.USERNAME,
  password: config.DB.PSW_KEY,
  database: config.DB.NAME,
  synchronize: config.DB.SYNC,
  logging: config.DB.LOG,
  entities: schemas.map(schema => require(dir + schema)),
};

export default dbConfig;
