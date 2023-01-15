import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'risk_heat_map',
  tableName: `${config.DB.PREFIX}_RISK_HEAT_MAP`,
  columns: {
    ...baseColumns,
    id_risk_heat_map: {
      primary: true,
      type: 'int',
      generated: true,
    },
    business_continuity: {
      type: 'char',
      length: '1'
    },
    percentage_inherent_risk_frequency: {
      type: 'decimal',
      precision: '18,4'
    },
    percentage_inherent_risk_impact: {
      type: 'decimal',
      precision: '18,4'
    },
    percentage_residual_risk_frequency: {
      type: 'decimal',
      precision: '18,4',
      nullable: true
    },
    percentage_residual_risk_impact: {
      type: 'decimal',
      precision: '18,4',
      nullable: true
    }
  },
  relations: {
    risk:{
        type: 'many-to-one',
        target: 'risk',
        joinColumn: {
            name: 'id_risk'
        },
        onDelete: 'CASCADE'
    },
    inherentRisk:{
        type: 'many-to-one',
        target: 'matrix',
        joinColumn: {
            name: 'id_matrix_inherent'
        },
        onDelete: 'CASCADE'
    },
    residualRisk:{
      type: 'many-to-one',
      target: 'matrix',
      joinColumn: {
          name: 'id_matrix_residual'
      },
      onDelete: 'CASCADE',
      nullable: true
    },
    heatMap: {
        type: 'many-to-one',
        target: 'heatMap',
        joinColumn: {
            name: 'id_heat_map'
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
    frequencyRisk: {
      type: 'many-to-one',
      target: 'frequency_risk',
      joinColumn: {
        name: 'id_frequency_risk',
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
    risk_variable_frequency: {
      type: 'one-to-many',
      target: 'risk_variable_frequency',
      inverseSide: 'riskHeatMap',
    },
    risk_variable_impact: {
      type: 'one-to-many',
      target: 'risk_variable_impact',
      inverseSide: 'riskHeatMap',
    },
    control_risk: {
      type: 'one-to-many',
      target: 'controls_risk',
      inverseSide: 'risk_heat_map'
    }
  },
});
