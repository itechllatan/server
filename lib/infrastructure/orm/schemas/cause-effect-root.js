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
      name:'ID_CAUSE_EFFECT_ROOT'
    },
    description: {
      type: 'varchar2',
      length: 2000,
      name:'DESCRIPTION'
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
});
