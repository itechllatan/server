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
  { name: 'heat-map', dir_schema: dir_schema + 'heat-map', dir_data: dir_data + 'heat-map' },
  { name: 'frequency-risk', dir_schema: dir_schema + 'frequency-risk', dir_data: dir_data + 'frequency-risk' },
  { name: 'impact-risk', dir_schema: dir_schema + 'impact-risk', dir_data: dir_data + 'impact-risk' },
  { name: 'risk-type', dir_schema: dir_schema + 'risk-type', dir_data: dir_data + 'risk-type' },
  { name: 'risk', dir_schema: dir_schema + 'risk', dir_data: dir_data + 'risk' },
  { name: 'risk-level', dir_schema: dir_schema + 'risk-level', dir_data: dir_data + 'risk-level' },
  { name: 'matrix', dir_schema: dir_schema + 'matrix', dir_data: dir_data + 'matrix' },
  { name: 'category-process', dir_schema: dir_schema + 'category-process', dir_data: dir_data + 'category-process' },
  { name: 'type-process', dir_schema: dir_schema + 'type-process', dir_data: dir_data + 'type-process' },
  { name: 'criticality-level', dir_schema: dir_schema + 'criticality-level', dir_data: dir_data + 'criticality-level' },
  { name: 'unit-time', dir_schema: dir_schema + 'unit-time', dir_data: dir_data + 'unit-time' },
  { name: 'time-ranges', dir_schema: dir_schema + 'time-ranges', dir_data: dir_data + 'time-ranges' },
  { name: 'solidity', dir_schema: dir_schema + 'solidity', dir_data: dir_data + 'solidity' },
  { name: 'variable-types', dir_schema: dir_schema + 'variable-types', dir_data: dir_data + 'variable-types' },
  { name: 'variables', dir_schema: dir_schema + 'variables', dir_data: dir_data + 'variables' },
  { name: 'variables-options', dir_schema: dir_schema + 'variables-options', dir_data: dir_data + 'variables-options' },
  { name: 'variables-level', dir_schema: dir_schema + 'variables-level', dir_data: dir_data + 'variables-level' },
  { name: 'weight-assignment', dir_schema: dir_schema + 'weight-assignment', dir_data: dir_data + 'weight-assignment' },
  { name: 'cause-effect-root', dir_schema: dir_schema + 'cause-effect-root', dir_data: dir_data + 'cause-effect-root' },
  { name: 'cause-effect-son', dir_schema: dir_schema + 'cause-effect-son', dir_data: dir_data + 'cause-effect-son' },
  { name: 'risk-factors-master', dir_schema: dir_schema + 'risk-factors-master', dir_data: dir_data + 'risk-factors-master' },
  { name: 'responsibles', dir_schema: dir_schema + 'responsibles', dir_data: dir_data + 'responsibles' },
  { name: 'menu', dir_schema: dir_schema + 'menu', dir_data: dir_data + 'menu' },
  { name: 'authority-menu', dir_schema: dir_schema + 'authority-menu', dir_data: dir_data + 'authority-menu' },
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
    dropSchema: false,
    logging: true
  };

  const conn = await initDB(params);
  console.log('Seeding DB');
  await seedDB();
  console.log('Closing DB');
  return await conn.close();
};

run();
