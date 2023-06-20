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
      name: 'ID_CRITICALITY_LEVEL'
    },
    name: {
      type: 'varchar',
      name: 'NAME'
    },
    weight: {
      type: 'decimal',
      precision: '18,4',
      name: 'WEIGHT'
    },
    percentage: {
      type: 'decimal',
      precision: '18,4',
      name: 'PERCENTAGE'
    },
    color: {
      type: 'varchar',
      name: 'COLOR'
    },
    enable: {
      type: 'int',
      default: 1,
      name: 'ENABLE'
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
  },
});



















