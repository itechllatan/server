import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'variable_types',
  tableName: `${config.DB.PREFIX}_VARIABLE_TYPES`,
  columns: {
    id_variable_type: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
    },
    rating_type: {
      type: 'varchar',
    },
  },
  relations: {
    variables: {
      type: 'one-to-many',
      target: 'variables',
      inverseSide: 'variable_type'
    },
  },
});
