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
      precision: '18,4'
    },
    weight_until: {
      type: 'decimal',
      precision: '18,4'
    },
    color: {
      type: 'varchar',
    },
  },
  relations: {
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
