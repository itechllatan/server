import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'cause_effect_root',
  tableName: `${config.DB.PREFIX}_CAUSE_EFFECT_ROOT`,
  columns: {
    id_cause_effect_root: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
    },
  },
});
