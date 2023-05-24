import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dbConfig from './ormconfig';

const oracledb = require('oracledb');
//oracledb.initOracleClient({ libDir: 'D://Doc_Matriz//instantclient_21_10' });
oracledb.initOracleClient({ libDir: './instantclient' });

const initDB = async function (params = {}) {
  let conn = null;
  try {
    //dbConfig.password = await dbConfig.password;
    Object.keys(params).forEach(key => (dbConfig[key] = params[key]));
    conn = await createConnection(dbConfig);
  } catch (error) {
    console.log('Error: ',
      error);
    throw error;
  }
  return conn;
};

export default initDB;
