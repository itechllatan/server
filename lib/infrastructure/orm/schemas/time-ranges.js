import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'time_ranges',
  tableName: `${config.DB.PREFIX}_TIME_RANGES`,
  columns: {
    ...baseColumns,
    id_time_ranges: {
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
    criticalityLevel: {
      type: 'many-to-one',
      target: 'criticality_level',
      joinColumn: {
        name: 'id_criticality_level',
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
