import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'criticality_level',
  tableName: `${config.DB.PREFIX}_CRITICALITY_LEVEL`,
  columns: {
    ...baseColumns,
    id_criticality_level: {
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



















