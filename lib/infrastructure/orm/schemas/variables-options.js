import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'variables_options',
  tableName: `${config.DB.PREFIX}_VARIABLES_OPTIONS`,
  columns: {
    ...baseColumns,
    id_variables_options: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_VARIABLES_OPTIONS',
    },
    name: {
      type: 'varchar2',
      name: 'NAME',
    },
    description: {
      type: 'varchar2',
      nullable: true,
      length: 2000,
      name: 'DESCRIPTION',
    },
    weight: {
      type: 'decimal',
      precision: '18,4',
      default: 0,
      name: 'WEIGHT',
    },
    toDefault: {
      type: 'int',
      default: 0,
      name: 'TODEFAULT',
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
        name: 'ID_VARIABLE',
      },
      onDelete: 'CASCADE'
    },
    deleted_by: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'DELETED_BY',
      },
      onDelete: 'CASCADE'
    },
  },
});
