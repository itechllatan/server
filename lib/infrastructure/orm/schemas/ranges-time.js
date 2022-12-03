import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'ranges_time',
  tableName: `${config.DB.PREFIX}_RANGES_TIME`,
  columns: {
    ...baseColumns,
    id_ranges_time: {
      primary: true,
      type: 'int',
      generated: true,
    },
    since: {
      type: 'int',
    },
    until: {
      type: 'int',
    },
    enable: {
      type: 'int',
      default: 1,
    }
  },
  relations: {
    unitTime: {
      type: 'many-to-one',
      target: 'unit_time',
      joinColumn: {
        name: 'id_unit_time',
      },
      onDelete: 'CASCADE'
    },
    levelCriticality: {
      type: 'many-to-one',
      target: 'level_criticality',
      joinColumn: {
        name: 'id_level_criticality',
      },
      onDelete: 'CASCADE'
    },
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
