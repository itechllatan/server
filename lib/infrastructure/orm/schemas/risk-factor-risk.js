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
      name: 'ID_RISK_FACTORS_RISK'
    },
  },
  relations: {
    risk_factor: {
      type: 'many-to-one',
      target: 'risk_factors_master',
      joinColumn: {
        name: 'ID_RISK_FACTOR',
      },
      onDelete: 'CASCADE'
    },
    risk_heat_map: {
      type: 'many-to-one',
      target: 'risk_heat_map',
      joinColumn: {
        name: 'ID_RISK_HEAT_MAP',
      },
      onDelete: 'CASCADE'
    },
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
    {columns: [ 'risk_factor' , 'risk_heat_map' ]}
  ]
});
