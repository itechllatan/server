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
      name: 'ID_CAUSE_EFFECT_SON'
    },
    description: {
      type: 'varchar',
      length: 2000,
      name: 'DESCRIPTION'
    },
  },
  relations: {
    cause_effect_root: {
      type: 'many-to-one',
      target: 'cause_effect_root',
      joinColumn: {
        name: 'ID_CAUSE_EFFECT_ROOT',
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
