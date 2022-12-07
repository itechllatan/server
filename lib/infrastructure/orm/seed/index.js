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
  { name: 'heat-map', dir_schema: dir_schema + 'heat-map', dir_data: dir_data + 'heat-map'},
  { name: 'frequency-risk', dir_schema: dir_schema + 'frequency-risk', dir_data: dir_data + 'frequency-risk'},
  { name: 'impact-risk', dir_schema: dir_schema + 'impact-risk', dir_data: dir_data + 'impact-risk'},
  { name: 'risk-type', dir_schema: dir_schema + 'risk-type', dir_data: dir_data + 'risk-type'},
  { name: 'risk', dir_schema: dir_schema + 'risk', dir_data: dir_data + 'risk'},
  { name: 'risk-level', dir_schema: dir_schema + 'risk-level', dir_data: dir_data + 'risk-level'},
  { name: 'matrix', dir_schema: dir_schema + 'matrix', dir_data: dir_data + 'matrix'},
  { name: 'category-process', dir_schema: dir_schema + 'category-process', dir_data: dir_data + 'category-process'},
  { name: 'type-process', dir_schema: dir_schema + 'type-process', dir_data: dir_data + 'type-process'},
  { name: 'level-criticality-color', dir_schema: dir_schema + 'level-criticality-color', dir_data: dir_data + 'level-criticality-color'},
  { name: 'level-criticality', dir_schema: dir_schema + 'level-criticality', dir_data: dir_data + 'level-criticality'},
  { name: 'variables-continuity', dir_schema: dir_schema + 'variables-continuity', dir_data: dir_data + 'variables-continuity'},
  { name: 'variablesC-levelC', dir_schema: dir_schema + 'variablesC-levelC', dir_data: dir_data + 'variablesCLevelC'},
  { name: 'unit-time', dir_schema: dir_schema + 'unit-time', dir_data: dir_data + 'unit-time'},
  { name: 'ranges-time', dir_schema: dir_schema + 'ranges-time', dir_data: dir_data + 'ranges-time'},
  { name: 'variables-design', dir_schema: dir_schema + 'variables-design', dir_data: dir_data + 'variables-design'},
  { name: 'variables-design-options', dir_schema: dir_schema + 'variables-design-options', dir_data: dir_data + 'variables-design-options'},
  { name: 'variables-execution', dir_schema: dir_schema + 'variables-execution', dir_data: dir_data + 'variables-execution'},
  { name: 'variables-execution-options', dir_schema: dir_schema + 'variables-execution-options', dir_data: dir_data + 'variables-execution-options'},
  { name: 'solidity', dir_schema: dir_schema + 'solidity', dir_data: dir_data + 'solidity'},
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
