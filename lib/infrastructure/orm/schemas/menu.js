import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'menu',
  tableName: `${config.DB.PREFIX}_MENU`,
  columns: {
    id_menu: {
      primary: true,
      type: 'int',
      generated: true,
      name:'ID_MENU'
    },
    url: {
      type: 'varchar',
      name:'URL'
    },
    description: {
      type: 'varchar',
      length: 2000,
      name:'DESCRIPTION'
    },
    is_menu: {
        type: 'number',
        isNullable: false,
        name:'IS_MENU'
    }
  },
  relations: {
    authority_menu: {
      type: 'one-to-many',
      target: 'authority_menu',
      inverseSide: 'menu',
      cascade: ['insert', 'update', 'remove'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
});
