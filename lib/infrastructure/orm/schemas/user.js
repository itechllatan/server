import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'user',
  tableName: `${config.DB.PREFIX}_USERS`,
  columns: {
    ...baseColumns,
    id_user: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_USER'
    },
    nickname: {
      type: 'varchar2',
      name: 'NICKNAME'
    },
    email: {
      type: 'varchar2',
      name: 'EMAIL'
    },
    password: {
      type: 'varchar2',
      select: false,
      default: null,
      name: 'PASSWORD'
    },
    name: {
      type: 'varchar2',
      default: null,
      name: 'NAME'
    },
    last_name: {
      type: 'varchar2',
      default: null,
      name: 'LAST_NAME'
    },
    validationHash: {
      type: 'varchar2',
      default: null,
      name: 'VALIDATIONHASH'
    },
    recoverPasswordHash: {
      type: 'varchar2',
      default: null,
      name: 'RECORPASSWORDHASH'
    },
    recoverPasswordDateTill: {
      type: 'timestamp',
      default: null,
      name: 'RECOVERPASSWORDDATETILL'
    },
  },
  indices: [
    {
      name: 'IDX_EMAIL',
      columns: ['email']
    },
  ],
  relations: {
    userTypes: {
      type: 'many-to-one',
      target: 'userTypes',
      joinColumn: {
        name: 'ID_USER_TYPE',
      },
      onDelete: 'CASCADE'
    },
    authorities: {
      type: 'one-to-one',
      target: 'user_authority',
      inverseSide: 'user',
      cascade: ['insert', 'update', 'remove'],
      onDelete: 'CASCADE',
    },
  },
});
