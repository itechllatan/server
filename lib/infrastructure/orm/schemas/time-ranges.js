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
      name: 'ID_TIME_RANGES',
    },
    since: {
      type: 'int',
      name: 'SINCE',
    },
    until: {
      type: 'int',
      name: 'UNTIL',
    },
    enable: {
      type: 'int',
      default: 1,
      name: 'ENABLE',
    }
  },
  relations: {
    unitTime: {
      type: 'many-to-one',
      target: 'unit_time',
      joinColumn: {
        name: 'ID_UNIT_TIME',
      },
      onDelete: 'CASCADE'
    },
    criticalityLevel: {
      type: 'many-to-one',
      target: 'criticality_level',
      joinColumn: {
        name: 'ID_CRITICALITY_LEVEL',
      },
      onDelete: 'CASCADE'
    },
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
