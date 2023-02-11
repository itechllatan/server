import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'riskFactorRisk',
  tableName: `${config.DB.PREFIX}_RISK_FACTORS_RISK`,
  columns: {
    ...baseColumns,
    id_risk_factors_risk: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    risk_factor: {
      type: 'many-to-one',
      target: 'risk_factors_master',
      joinColumn: {
        name: 'id_risk_factor',
      },
      onDelete: 'CASCADE'
    },
    risk_heat_map: {
      type: 'many-to-one',
      target: 'risk_heat_map',
      joinColumn: {
        name: 'id_risk_heat_map',
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
