import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'variables',
  tableName: `${config.DB.PREFIX}_VARIABLES`,
  columns: {
    ...baseColumns,
    id_variable: {
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
      type: 'decimal',
      precision: '18,2'
    },
    enable: {
      type: 'int',
      default: 0,
    }
  },
  relations: {
    controlsVariables: {
      type: 'one-to-many',
      target: 'variables',
      inverseSide: 'variables'
    },
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'id_user',
      },
      onDelete: 'CASCADE'
    },
    variable_type: {
      type: 'many-to-one',
      target: 'variable_types',
      joinColumn: {
        name: 'id_variable_type',
      },
      onDelete: 'CASCADE'
    },
  },
});
