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
      name: 'ID_SUBPROCESS_RESPONSIBLE',
    },
  },
  relations: {
    subprocess: {
      type: 'many-to-one',
      target: 'subprocess',
      joinColumn: {
        name: 'ID_SUBPROCESS',
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
    {columns: [ 'subprocess' , 'responsibles' ]}
  ]
});
