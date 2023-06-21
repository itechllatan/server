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
      name: 'ID_PROCESS_RESPONSIBLE',
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
    responsibles: {
      type: 'many-to-one',
      target: 'responsibles',
      joinColumn: {
        name: 'ID_RESPONSIBLES',
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
    deleted_by: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'DELETED_BY',
      },
      onDelete: 'CASCADE'
    },
  },
  uniques: [
    {columns: [ 'process' , 'responsibles' ]}
  ]
});
