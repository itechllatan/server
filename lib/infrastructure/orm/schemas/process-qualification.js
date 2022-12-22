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
    },
  },
  relations: {
    process: {
      type: 'many-to-one',
      target: 'process',
      joinColumn: {
        name: 'id_process',
      },
      onDelete: 'CASCADE'
    },
    variables: {
      type: 'many-to-one',
      target: 'variables',
      joinColumn: {
        name: 'id_variable',
      },
      onDelete: 'CASCADE'
    },
    timeRanges: {
      type: 'many-to-one',
      target: 'time_ranges',
      joinColumn: {
        name: 'id_time_ranges',
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
  uniques: [
    { columns: ['process', 'variables', 'timeRanges', 'criticalityLevel'] }
  ]
});
