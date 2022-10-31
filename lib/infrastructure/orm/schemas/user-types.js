import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'userTypes',
  tableName: `${config.DB.PREFIX}_USER_TYPES`,
  columns: {
    id_user_type: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
    },
    description_en: {
      type: 'varchar',
      default: null
    },
  },
  relations: {
    user: {
      type: 'one-to-many',
      target: 'user',
    },
  },
});
