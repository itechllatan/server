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
      nullable: true
    },
    weight: {
      type: 'decimal',
      precision: '18,4',
      default: 0
    },
    toDefault: {
      type: 'int',
      default: 0
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
