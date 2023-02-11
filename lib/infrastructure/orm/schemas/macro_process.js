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
    },
    name: {
      type: 'varchar',
    },
    description: {
      type: 'varchar',
      nullable: true,
      length: 2000
    },
    evidence: {
      type: 'int',
      default: null
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
        name: 'id_type_process',
      },
      onDelete: 'CASCADE'
    },
    categoryProcess: {
      type: 'many-to-one',
      target: 'categoryProcess',
      joinColumn: {
        name: 'id_category_process',
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
    macroProcessRisk: {
      type: 'one-to-many',
      target: 'macroprocessRisk',
      inverseSide: 'macro_process',
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
});
