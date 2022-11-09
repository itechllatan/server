import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'typeProcess',
  tableName: `${config.DB.PREFIX}_TYPE_PROCESS`,
  columns: {
    id_type_process: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
    },
  },
  relations: {
  },
});
