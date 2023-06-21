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
      name: 'ID_USER_TYPE'
    },
    description: {
      type: 'varchar2',
      length: 2000,
      name: 'DESCRIPTION'
    },
    description_en: {
      type: 'varchar2',
      default: null,
      name: 'DESCRIPTION_EN'
    },
  },
  relations: {
    user: {
      type: 'one-to-many',
      target: 'user',
    },
  },
});
