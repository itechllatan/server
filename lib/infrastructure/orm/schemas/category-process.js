import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'categoryProcess',
  tableName: `${config.DB.PREFIX}_CATEGORY_PROCESS`,
  columns: {
    id_category_process: {
      primary: true,
      type: 'int',
      generated: true,
      name:'ID_CATEGORY_PROCESS'
    },
    description: {
      type: 'varchar',
      length: 2000,
      name:'DESCRIPTION'
    },
  },
  relations: {
  },
});
