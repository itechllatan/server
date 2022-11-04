import GenericFactory from './generic-factory';
import _ from 'lodash';

class GenericSeeder {
  static async seed({ name, dir_schema, dir_data }) {
    let factory;
    try {
      console.log(`Seeding dummy ${name} data...`);
      const schema = require(dir_schema);
      let data = require(dir_data);
      if (_.isFunction(data)){
        data = await data();
      }
      const entities = data
        .map(data_seed => GenericFactory.build(data_seed,
          schema));

      factory = GenericFactory.create(entities,
        schema);
    } catch (e) {
      console.error(`ERROR - ${name}: `,
        e);
    }
    return factory;
  };
}

export default GenericSeeder;
