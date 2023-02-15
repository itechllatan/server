import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'risk_factors_master',
  tableName: `${config.DB.PREFIX}_RISK_FACTORS_MASTER`,
  columns: {
    ...baseColumns,
    id_risk_factors_master: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
      length: 2000
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
    deleted_by: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'deleted_by',
      },
      onDelete: 'CASCADE'
    },
  },
});
