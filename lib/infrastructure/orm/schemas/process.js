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
    nombre: {
      type: 'varchar',
    },
    evidencia: {
      type: 'int',
      /*select: false,*/
      default: null
    },
  },
  indices: [
    {
      name: 'IDX_nombre',
      columns: [
        'nombre'
      ]
    },
  ],
  /*
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
  */
});
