import initDB from '../typeorm';
import GenericSeeder from './seeder';

const dir_schema = '../schemas/';
const dir_data = '../data/';
const seeds = [
  { name: 'authority', dir_schema: dir_schema + 'authority', dir_data: dir_data + 'authority' },
  { name: 'permits', dir_schema: dir_schema + 'permits', dir_data: dir_data + 'permits' },
  { name: 'user-types', dir_schema: dir_schema + 'user-types', dir_data: dir_data + 'user-types' },
  { name: 'user', dir_schema: dir_schema + 'user', dir_data: dir_data + 'user' },
  { name: 'user-authorities', dir_schema: dir_schema + 'user-authority', dir_data: dir_data + 'user-authorities' },
  { name: 'authority-permits', dir_schema: dir_schema + 'authority-permits', dir_data: dir_data + 'authority-permits' },
];

const seedDB = async () => {
  for (let seed of seeds) {
    await GenericSeeder.seed(seed);
    console.log(`Done ${seed.name}.`);
  }
};

const run = async () => {
  const env = process.env.NODE_ENV;
  if (env !== 'dev' &&
    env !== 'tst' &&
    env !== 'dev-cloud') {
    console.log('Avoid running seeders on stg o prd environments.\n');
    /* eslint-disable no-process-exit */
    process.exit(1);
  }

  console.log('Connecting to DB');
  const params = {
    synchronize: true,
    dropSchema: true,
    logging: true
  };

  const conn = await initDB(params);
  console.log('Seeding DB');
  await seedDB();
  console.log('Closing DB');
  return await conn.close();
};

run();
