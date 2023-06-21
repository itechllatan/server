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
      name: 'ID_RESPONSIBLES',
    },
    document_number: {
      type: 'varchar2',
      name: 'DOCUMENT_NUMBER',
    },
    names: {
      type: 'varchar2',
      name: 'NAMES',
    },
    last_name_1: {
      type: 'varchar2',
      name: 'LAST_NAME_1',
    },
    last_name_2: {
      type: 'varchar2',
      nullable: true,
      name: 'LAST_NAME_2',
    },
    mail: {
      type: 'varchar2',
      nullable: true,
      name: 'MAIL',
    },
  },
  relations: {
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
  // uniques: [
  //   { columns: ['document_number'] }
  // ]
});
