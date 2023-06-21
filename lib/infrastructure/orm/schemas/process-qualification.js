import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'process_qualification',
  tableName: `${config.DB.PREFIX}_PROCESS_QUALIFICATION`,
  columns: {
    ...baseColumns,
    id_process_qualification: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_PROCESS_QUALIFICATION',
    },
  },
  relations: {
    process: {
      type: 'many-to-one',
      target: 'process',
      joinColumn: {
        name: 'ID_PROCESS',
      },
      onDelete: 'CASCADE'
    },
    variables: {
      type: 'many-to-one',
      target: 'variables',
      joinColumn: {
        name: 'ID_VARIABLE',
      },
      onDelete: 'CASCADE'
    },
    timeRanges: {
      type: 'many-to-one',
      target: 'time_ranges',
      joinColumn: {
        name: 'ID_TIME_RANGES',
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
  uniques: [
    { columns: ['process', 'variables', 'timeRanges', 'criticalityLevel'] }
  ]
});
