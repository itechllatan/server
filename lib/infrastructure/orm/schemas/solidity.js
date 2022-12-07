import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'solidity',
  tableName: `${config.DB.PREFIX}_SOLIDITY`,
  columns: {
    ...baseColumns,
    id_solidity: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    description: {
      type: 'varchar',
    },
    weight_since: {
      type: 'decimal',
      precision: '18,2'
    },
    weight_until: {
      type: 'decimal',
      precision: '18,2'
    },
  },
  relations: {
    levelCriticalityColor: {
      type: 'many-to-one',
      target: 'level_criticality_color',
      joinColumn: {
        name: 'id_level_criticality_color',
      },
      onDelete: 'CASCADE'
    },
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'id_user',
      },
      onDelete: 'CASCADE'
    },
  },
});
