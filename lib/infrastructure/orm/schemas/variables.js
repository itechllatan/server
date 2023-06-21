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
      name: 'ID_VARIABLE',
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
      name: 'WEIGHT',
    },
    enable: {
      type: 'int',
      default: 1,
      name: 'ENABLE',
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
        name: 'ID_USER',
      },
      onDelete: 'CASCADE'
    },
    variable_type: {
      type: 'many-to-one',
      target: 'variable_types',
      joinColumn: {
        name: 'ID_VARIABLE_TYPE',
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
