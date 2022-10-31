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
    },
    url: {
      type: 'varchar',
    },
    method: {
      type: 'varchar',
    },
    description: {
      type: 'varchar',
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
