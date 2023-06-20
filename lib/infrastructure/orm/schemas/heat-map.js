import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'heatMap',
  tableName: `${config.DB.PREFIX}_HEAT_MAP`,
  columns: {
    ...baseColumns,
    id_heat_map: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_HEAT_MAP'
    },
    name: {
      type: 'varchar',
      name: 'NAME'
    },
    description: {
      type: 'varchar',
      length: 2000,
      name: 'DESCRIPTION'
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'ID_USER',
      },
      onDelete: 'CASCADE'
    },
    matrix: {
      type: 'one-to-many',
      target: 'matrix',
      inverseSide: 'heatMap',      
    }
  },
});
