module.exports = {
  DB: {
    TYPE: 'oracle',
    USERNAME: 'system',
    PSW_KEY: 'admin654',
    HOST: 'localhost',
    NAME: 'matriz',
    PORT: 1521,
    SYNC: false,
    LOG: true,
    CONSTR: "(DESCRIPTION =(ADDRESS_LIST =(ADDRESS = (PROTOCOL = TCP)(Host = localhost)(Port = 1521)))(CONNECT_DATA =(SERVICE_NAME = xe)(SERVER=dedicated)))",
    PREFIX: 'MR',
  },
}