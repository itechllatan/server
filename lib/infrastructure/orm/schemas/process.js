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
    },
    name: {
      type: 'varchar',
    },
    description: {
      type: 'varchar',
      nullable: true
    },
    evidence: {
      type: 'int',
      default: null
    },
  },
  indices: [
    {
      name: 'IDX_name_process',
      columns: [
        'name'
      ]
    },
  ],
  relations: {
    macroProcess: {
      type: 'many-to-one',
      target: 'macro_process',
      joinColumn: {
        name: 'id_macro_process',
      },
      onDelete: 'CASCADE'
    },
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
  },
});
