import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'subprocess_responsible',
  tableName: `${config.DB.PREFIX}_SUBPROCESS_RESPONSIBLE`,
  columns: {
    ...baseColumns,
    id_subprocess_responsible: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    subprocess: {
      type: 'many-to-one',
      target: 'subprocess',
      joinColumn: {
        name: 'id_subprocess',
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
    {columns: [ 'subprocess' , 'responsibles' ]}
  ]
});
