import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'unit_time',
  tableName: `${config.DB.PREFIX}_UNIT_TIME`,
  columns: {
    id_unit_time: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_UNIT_TIME',
    },
    description: {
      type: 'varchar2',
      length: 2000,
      name: 'DESCRIPTION',
    },
  },
});
