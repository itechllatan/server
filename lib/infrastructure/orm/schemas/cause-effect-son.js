import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'cause_effect_son',
  tableName: `${config.DB.PREFIX}_CAUSE_EFFECT_SON`,
  columns: {
    ...baseColumns,
    id_cause_effect_son: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
      length: 2000
    },
  },
  relations: {
    cause_effect_root: {
      type: 'many-to-one',
      target: 'cause_effect_root',
      joinColumn: {
        name: 'id_cause_effect_root',
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
