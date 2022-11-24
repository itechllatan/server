import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'matrix',
  tableName: `${config.DB.PREFIX}_MATRIX`,
  columns: {
    ...baseColumns,
    id_matrix: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    frequencyRisk: {
        type: 'many-to-one',
        target: 'frequency_risk',
        joinColumn: {
            name: 'id_frequency_risk',
        },
        onDelete: 'CASCADE'
    },
    impactRisk: {
        type: 'many-to-one',
        target: 'impact_risk',
        joinColumn: {
            name: 'id_impact_risk',
        },
        onDelete: 'CASCADE'
    },
    riskLevel:{
        type: 'many-to-one',
        target: 'risk_level',
        joinColumn: {
            name: 'id_risk_level'
        },
        onDelete: 'CASCADE'
    },
    heatMap: {
        type: 'many-to-one',
        target: 'heatMap',
        joinColumn: {
            name: 'id_heat_map',
        },
        onDelete: 'CASCADE'
    },
  },
});
