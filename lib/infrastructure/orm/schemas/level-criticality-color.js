import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'level_criticality_color',
  tableName: `${config.DB.PREFIX}_LEVEL_CRITICALITY_COLOR`,
  columns: {
    id_level_criticality_color: {
      primary: true,
      type: 'int',
      generated: true,
    },
    color: {
      type: 'varchar',
    },
  },
  relations: {
    levelCriticality: {
      type: 'one-to-many',
      target: 'level_criticality',
      inverseSide: 'level_criticality_color'
    }
  },
});
























