import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'risk_variable_impact',
  tableName: `${config.DB.PREFIX}_RISK_VARIABLE_IMPACT`,
  columns: {
    id_risk_variable_impact: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    riskHeatMap:{
        type: 'many-to-one',
        target: 'risk_heat_map',
        joinColumn: {
            name: 'id_risk_heat_map'
        },
        onDelete: 'CASCADE'
    },
    variable:{
        type: 'many-to-one',
        target: 'variables',
        joinColumn: {
            name: 'id_variable'
        },
        onDelete: 'CASCADE'
    },
    impactRisk: {
      type: 'many-to-one',
      target: 'impact_risk',
      joinColumn: {
        name: 'id_impact_risk'
      },
      onDelete: 'CASCADE'
    },
  },
});
