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
      name: 'ID_WEIGHT_ASSIGNMENT',
    },
    name: {
      type: 'varchar2',
      name: 'NAME',
    },
    weight: {
      type: 'decimal',
      precision: '18,4',
      name: 'WEIGHT',
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
  },
  uniques: [
    { columns: ['name'] }
  ]
});
