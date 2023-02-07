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
    },
  },
  relations: {
    macroprocess: {
      type: 'many-to-one',
      target: 'macro_process',
      joinColumn: {
        name: 'id_macro_process',
      },
      onDelete: 'CASCADE'
    },
    responsibles: {
      type: 'many-to-one',
      target: 'responsibles',
      joinColumn: {
        name: 'id_responsibles',
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
