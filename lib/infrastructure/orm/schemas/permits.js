import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'permits',
  tableName: `${config.DB.PREFIX}_PERMITS`,
  columns: {
    id_permit: {
      primary: true,
      type: 'int',
      generated: true,
      name:'ID_PERMIT'
    },
    url: {
      type: 'varchar2',
      name:'URL'
    },
    method: {
      type: 'varchar2',
      name:'METHOD'
    },
    description: {
      type: 'varchar2',
      length: 2000,
      name:'DESCRIPTION'
    },
  },
  relations: {
    authority_permits: {
      type: 'one-to-many',
      target: 'authority_permits',
      inverseSide: 'permits',
      cascade: ['insert', 'update', 'remove'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
});
