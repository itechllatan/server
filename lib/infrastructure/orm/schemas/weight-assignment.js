import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'weight_assignment',
  tableName: `${config.DB.PREFIX}_WEIGHT_ASSIGNMENT`,
  columns: {
    id_weight_assignment: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    weight: {
      type: 'decimal',
      precision: '18,4'
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
