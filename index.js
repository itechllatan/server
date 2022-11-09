import bootstrap from './lib/infrastructure';
import createServer from './lib/infrastructure/api/server';

// Start the server
const start = async () => {

  try {
    // init database
    await bootstrap.init();
    // init api server
    await createServer();
    //  await server.start();

    console.log('Server running at:', process.env.PORT, ' ENV: ', process.env.NODE_ENV);

  } catch (error) {
    console.log(error)
    console.log('Trying to reconnect DB.');

    // setTimeout(start, 10000);
    setTimeout(start, 2000);
  }
};

start();
