import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'responsibles',
  tableName: `${config.DB.PREFIX}_RESPONSIBLES`,
  columns: {
    ...baseColumns,
    id_responsibles: {
      primary: true,
      type: 'int',
      generated: true,
    },
    document_number: {
      type: 'varchar',
    },
    names: {
      type: 'varchar',
    },
    last_name_1: {
      type: 'varchar',
    },
    last_name_2: {
      type: 'varchar',
      nullable: true,
    },
    mail: {
      type: 'varchar',
      nullable: true,
    },
  },
  relations: {
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
  // uniques: [
  //   { columns: ['document_number'] }
  // ]
});
