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
    rangesTime: {
      type: 'many-to-one',
      target: 'ranges_time',
      joinColumn: {
        name: 'id_ranges_time',
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
  uniques: [
    { columns: ['process', 'variables', 'rangesTime', 'levelCriticality'] }
  ]
});
