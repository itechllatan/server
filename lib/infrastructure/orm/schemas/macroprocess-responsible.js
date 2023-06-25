import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'macroprocess_responsible',
  tableName: `${config.DB.PREFIX}_MACROPROCESS_RESPONSIBLE`,
  columns: {
    ...baseColumns,
    id_macroprocess_responsible: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_MACROPROCESS_RESPONSIBLE'
    },
  },
  relations: {
    macroprocess: {
      type: 'many-to-one',
      target: 'macro_process',
      joinColumn: {
        name: 'ID_MACRO_PROCESS',
      },
      onDelete: 'CASCADE',
      nullable: false,
    },
    responsibles: {
      type: 'many-to-one',
      target: 'responsibles',
      joinColumn: {
        name: 'ID_RESPONSIBLES',
      },
      onDelete: 'CASCADE',
      nullable: false,
    },
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'ID_USER',
      },
      onDelete: 'CASCADE',
      nullable: false,
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
    {columns: [ 'macroprocess' , 'responsibles' ]}
  ]
});
