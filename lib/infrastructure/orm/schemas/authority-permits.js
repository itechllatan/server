import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'authority_permits',
  tableName: `${config.DB.PREFIX}_AUTHORITY_PERMITS`,
  columns: {
    id_authority_permits: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    authority: {
      type: 'many-to-one',
      target: 'authority',
      joinColumn: {
        name: 'id_authority',
      },
      onDelete: 'CASCADE',
      inverseSide: 'authority_permits',
    },
    permits: {
      type: 'many-to-one',
      target: 'permits',
      joinColumn: {
        name: 'id_permit',
      },
      inverseSide: 'authority_permits',
      onDelete: 'CASCADE',
    },
  },
});
