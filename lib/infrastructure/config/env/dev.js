module.exports = {
  DB: {
    TYPE: 'oracle',
    USERNAME: 'GESRIES',
    PSW_KEY: 'Ple_c4m3_Rpw',
    HOST: '10.0.202.125',
    NAME: 'BSCRSDPDB',
    PORT: 1522,
    SYNC: false,
    LOG: true,
    CONSTR: "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 10.0.202.125)(PORT = 1522))      (CONNECT_DATA =        (SERVER = DEDICATED)        (SERVICE_NAME = bscrsdpdb)      ))",
    PREFIX: 'MR',
  },
}