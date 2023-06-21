import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'macro_process',
  tableName: `${config.DB.PREFIX}_MACRO_PROCESS`,
  columns: {
    ...baseColumns,
    id_macro_process: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_MACRO_PROCESS'
    },
    name: {
      type: 'varchar2',
      name: 'NAME'
    },
    description: {
      type: 'varchar2',
      nullable: true,
      length: 2000,
      name: 'DESCRIPTION'
    },
    evidence: {
      type: 'int',
      default: null,
      name: 'EVIDENCE'
    },
  },
  indices: [
    {
      name: 'IDX_name_macro_process',
      columns: [
        'name'
      ]
    },
  ],
  relations: {
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
    macroProcessRisk: {
      type: 'one-to-many',
      target: 'macroprocessRisk',
      inverseSide: 'macro_process',
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
