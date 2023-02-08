import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'cause_effect_root',
  tableName: `${config.DB.PREFIX}_CAUSE_EFFECT_ROOT`,
  columns: {
    ...baseColumns,
    id_cause_effect_root: {
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
