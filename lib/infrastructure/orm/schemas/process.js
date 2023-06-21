import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'process',
  tableName: `${config.DB.PREFIX}_PROCESS`,
  columns: {
    ...baseColumns,
    id_process: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_PROCESS',
    },
    name: {
      type: 'varchar2',
      name: 'NAME',
    },
    description: {
      type: 'varchar2',
      nullable: true,
      length: 2000,
      name: 'DESCRIPTION',
    },
    evidence: {
      type: 'int',
      default: null,
      name: 'EVIDENCE',
    },
  },
  indices: [
    {
      name: 'IDX_NAME_PROCESS',
      columns: ['name']
    },
  ],
  relations: {
    macroProcess: {
      type: 'many-to-one',
      target: 'macro_process',
      joinColumn: {
        name: 'ID_MACRO_PROCESS',
      },
      onDelete: 'CASCADE'
    },
    typeProcess: {
      type: 'many-to-one',
      target: 'typeProcess',
      joinColumn: {
        name: 'ID_TYPE_PROCESS',
      },
      onDelete: 'CASCADE'
    },
    categoryProcess: {
      type: 'many-to-one',
      target: 'categoryProcess',
      joinColumn: {
        name: 'ID_CATEGORY_PROCESS',
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
});
