import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'solidity',
  tableName: `${config.DB.PREFIX}_SOLIDITY`,
  columns: {
    ...baseColumns,
    id_solidity: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_SOLIDITY',
    },
    name: {
      type: 'varchar2',
      name: 'NAME',
    },
    description: {
      type: 'varchar2',
      length: 2000,
      name: 'DESCRIPTION',
    },
    weight_since: {
      type: 'decimal',
      precision: '18,4',
      name: 'WEIGHT_SINCE',
    },
    weight_until: {
      type: 'decimal',
      precision: '18,4',
      name: 'WEIGHT_UNTIL',
    },
    color: {
      type: 'varchar2',
      name: 'COLOR',
    },
    per_assigned_frequency: {
      type: 'decimal',
      precision: '10,2',
      name: 'PER_ASSIGNED_FREQUENCY',
    },
    per_assigned_impact: {
      type: 'decimal',
      precision: '10,2',
      name: 'PER_ASSIGNED_IMPACT',
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'ID_USER',
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
