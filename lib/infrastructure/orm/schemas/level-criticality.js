import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'level_criticality',
  tableName: `${config.DB.PREFIX}_LEVEL_CRITICALITY`,
  columns: {
    ...baseColumns,
    id_level_criticality: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    weight: {
      type: 'decimal',
      precision: '18,4'
    },
    percentage: {
      type: 'decimal',
      precision: '18,4'
    },
    color: {
      type: 'varchar',
    },
    enable: {
      type: 'int',
      default: 1,
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



















