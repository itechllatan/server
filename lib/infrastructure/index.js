import initDb from './orm/typeorm';

module.exports = {
  async init() {
    let conn;
    try {
      conn = await initDb();
      console.log('Connection to DB has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:',
        error);
      throw error;
    }
    return conn;
  },
};
