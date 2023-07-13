module.exports = {
  DB: {
    TYPE: 'oracle',
    USERNAME: 'GESRIESGOS', //'system',
    PSW_KEY: 'GesRies_2023', //'admin654',
    HOST: 'adb.us-ashburn-1.oraclecloud.com', //'localhost',
    NAME: 'ORACLOUD', //'matriz',
    PORT: 1522, //1521,
    SYNC: true, //false,
    LOG: true,
    CONSTR: "(description = (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.us-ashburn-1.oraclecloud.com))    (connect_data=(service_name=wblvzqpbckix5lu_dboracletst_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))",
    PREFIX: 'MR',
  },
}