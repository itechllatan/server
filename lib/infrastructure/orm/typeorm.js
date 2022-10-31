import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dbConfig from './ormconfig';

const initDB = async function (params = {}) {
  let conn = null;
  try {
    dbConfig.password = await dbConfig.password;
    Object.keys(params).forEach(key => (dbConfig[key] = params[key]));
    conn = createConnection(dbConfig);
  } catch (error) {
    console.log('Error: ',
      error);
    throw error;
  }
  return conn;
};

export default initDB;
