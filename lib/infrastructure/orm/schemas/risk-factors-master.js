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
      name: 'ID_RISK_FACTORS_MASTER',
    },
    description: {
      type: 'varchar2',
      length: 2000,
      name: 'DESCRIPTION',
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'ID_USER',
      },
      onDelete: 'CASCADE',
      nullable: false,
    },
    deleted_by: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'DELETED_BY',
      },
      onDelete: 'CASCADE'
    },
  },
});
