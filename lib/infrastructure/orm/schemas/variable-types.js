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
      name: 'ID_VARIABLE_TYPE'
    },
    description: {
      type: 'varchar2',
      length: 2000,
      name: 'DESCRIPTION'
    },
    rating_type: {
      type: 'varchar2',
      name: 'RATING_TYPE'
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
