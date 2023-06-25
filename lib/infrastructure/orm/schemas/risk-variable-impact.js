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
      name: 'ID_RISK_VARIABLE_IMPACT',
    },
  },
  relations: {
    riskHeatMap:{
        type: 'many-to-one',
        target: 'risk_heat_map',
        joinColumn: {
            name: 'ID_RISK_HEAT_MAP'
        },
        onDelete: 'CASCADE',
        nullable: false,
    },
    variable:{
        type: 'many-to-one',
        target: 'variables',
        joinColumn: {
            name: 'ID_VARIABLE'
        },
        onDelete: 'CASCADE',
        nullable: false,
    },
    impactRisk: {
      type: 'many-to-one',
      target: 'impact_risk',
      joinColumn: {
        name: 'ID_IMPACT_RISK'
      },
      onDelete: 'CASCADE',
      nullable: false,
    },
  },
});
