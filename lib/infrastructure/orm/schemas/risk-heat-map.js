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
      name: 'ID_RISK_HEAT_MAP',
    },
    business_continuity: {
      type: 'char',
      length: '1',
      name: 'BUSINESS_CONTINUITY',
    },
    percentage_inherent_risk_frequency: {
      type: 'decimal',
      precision: '18,4',
      name: 'PERCENTAGE_INHERENT_RISK_FREQUENCY',
    },
    percentage_inherent_risk_impact: {
      type: 'decimal',
      precision: '18,4',
      name: 'PERCENTAGE_INHERENT_RISK_IMPACT',
    },
    percentage_residual_risk_frequency: {
      type: 'decimal',
      precision: '18,4',
      nullable: true,
      name: 'PERCENTAGE_RESIDUAL_RISK_FREQUENCY',
    },
    percentage_residual_risk_impact: {
      type: 'decimal',
      precision: '18,4',
      nullable: true,
      name: 'PERCENTAGE_RESIDUAL_RISK_IMPACT',
    }
  },
  relations: {
    risk:{
        type: 'many-to-one',
        target: 'risk',
        joinColumn: {
            name: 'ID_RISK'
        },
        onDelete: 'CASCADE'
    },
    inherentRisk:{
        type: 'many-to-one',
        target: 'matrix',
        joinColumn: {
            name: 'ID_MATRIX_INHERENT'
        },
        onDelete: 'CASCADE'
    },
    residualRisk:{
      type: 'many-to-one',
      target: 'matrix',
      joinColumn: {
          name: 'ID_MATRIX_RESIDUAL'
      },
      onDelete: 'CASCADE',
      nullable: true
    },
    heatMap: {
        type: 'many-to-one',
        target: 'heatMap',
        joinColumn: {
            name: 'ID_HEAT_MAP'
        },
        onDelete: 'CASCADE'
    },
    impactRisk: {
      type: 'many-to-one',
      target: 'impact_risk',
      joinColumn: {
        name: 'ID_IMPACT_RISK'
      },
      onDelete: 'CASCADE'
    },
    frequencyRisk: {
      type: 'many-to-one',
      target: 'frequency_risk',
      joinColumn: {
        name: 'ID_FREQUENCY_RISK',
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

    /**/
    macroprocessRisk: {
      type: 'one-to-many',
      target: 'macroprocessRisk',
      inverseSide: 'risk_heat_map'
    },
    processRisk: {
      type: 'one-to-many',
      target: 'processRisk',
      inverseSide: 'risk_heat_map'
    },
    subprocessRisk: {
      type: 'one-to-many',
      target: 'subprocessRisk',
      inverseSide: 'risk_heat_map'
    },
    control_risk: {
      type: 'one-to-many',
      target: 'controls_risk',
      inverseSide: 'risk_heat_map'
    },
    plans_action_risk: {
      type: 'one-to-many',
      target: 'plans_action_risk',
      inverseSide: 'risk_heat_map'
    },

    risk_cause_effect: {
      type: 'one-to-many',
      target: 'risk_cause_effect',
      inverseSide: 'risk_heat_map'
    },
    riskFactorRisk: {
      type: 'one-to-many',
      target: 'riskFactorRisk',
      inverseSide: 'risk_heat_map'
    },
    riskResponsible: {
      type: 'one-to-many',
      target: 'riskResponsible',
      inverseSide: 'risk_heat_map'
    },
    /**/
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
