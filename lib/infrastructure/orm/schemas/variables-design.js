import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'variables_design',
  tableName: `${config.DB.PREFIX}_VARIABLES_DESIGN`,
  columns: {
    ...baseColumns,
    id_variables_design: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    description: {
      type: 'varchar',
    },
    weight: {
      type: 'int',
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'id_user',
      },
      onDelete: 'CASCADE'
    },
  },
});
