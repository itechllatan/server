import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'cause_effect_son',
  tableName: `${config.DB.PREFIX}_CAUSE_EFFECT_SON`,
  columns: {
    id_cause_effect_son: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
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
  },
});
