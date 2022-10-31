import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'authority',
  tableName: `${config.DB.PREFIX}_AUTHORITY`,
  columns: {
    id_authority: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
    },
    label: {
      type: 'varchar',
    },
  },
  relations: {
    userAuthorities: {
      type: 'one-to-many',
      target: 'user_authority',
      inverseSide: 'authority'
    },
    authority_permits: {
      type: 'one-to-many',
      target: 'authority_permits',
      inverseSide: 'authority',
      cascade: ['insert', 'update', 'remove'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
});
