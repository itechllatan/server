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
    },
    nickname: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
      select: false,
      default: null
    },
    name: {
      type: 'varchar',
      default: null,
    },
    last_name: {
      type: 'varchar',
      default: null,
    },
    validationHash: {
      type: 'varchar',
      default: null
    },
    recoverPasswordHash: {
      type: 'varchar',
      default: null
    },
    recoverPasswordDateTill: {
      type: 'timestamp',
      default: null
    },
  },
  indices: [
    {
      name: 'IDX_email',
      columns: [
        'email'
      ]
    },
  ],
  relations: {
    userTypes: {
      type: 'many-to-one',
      target: 'userTypes',
      joinColumn: {
        name: 'id_user_type',
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
