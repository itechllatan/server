import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'variables_options',
  tableName: `${config.DB.PREFIX}_VARIABLES_OPTIONS`,
  columns: {
    id_variables_options: {
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
    toDefault: {
      type: 'int',
    },
  },
  relations: {
    controlsVariables: {
      type: 'one-to-many',
      target: 'controls_variables',
      inverseSide: 'variablesOptions'
    },
    variables: {
      type: 'many-to-one',
      target: 'variables',
      joinColumn: {
        name: 'id_variable',
      },
      onDelete: 'CASCADE'
    },
  },
});
