import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'process_responsible',
  tableName: `${config.DB.PREFIX}_PROCESS_RESPONSIBLE`,
  columns: {
    ...baseColumns,
    id_process_responsible: {
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
    responsibles: {
      type: 'many-to-one',
      target: 'responsibles',
      joinColumn: {
        name: 'id_responsibles',
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
    deleted_by: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'deleted_by',
      },
      onDelete: 'CASCADE'
    },
  },
  uniques: [
    {columns: [ 'process' , 'responsibles' ]}
  ]
});
