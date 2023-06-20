import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'authority_menu',
  tableName: `${config.DB.PREFIX}_AUTHORITY_MENU`,
  columns: {
    id_authority_menu: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_AUTHORITY_MENU'
    },
  },
  relations: {
    authority: {
      type: 'many-to-one',
      target: 'authority',
      joinColumn: {
        name: 'ID_AUTHORITY',
      },
      onDelete: 'CASCADE',
      inverseSide: 'authority_menu',
    },
    menu: {
      type: 'many-to-one',
      target: 'menu',
      joinColumn: {
        name: 'ID_MENU',
      },
      inverseSide: 'authority_menu',
      onDelete: 'CASCADE',
    },
  },
});
