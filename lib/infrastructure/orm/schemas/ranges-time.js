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
    unit_measurement: {
      type: 'varchar',
    },
    level_criticality: {
      type: 'varchar',
    },
    percentage : {
      type: 'int',
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
