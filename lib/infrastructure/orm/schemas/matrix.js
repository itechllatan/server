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
      name: 'ID_MATRIX',
    },
  },
  relations: {
    frequencyRisk: {
        type: 'many-to-one',
        target: 'frequency_risk',
        joinColumn: {
            name: 'ID_FREQUENCY_RISK',
        },
        onDelete: 'CASCADE'
    },
    impactRisk: {
        type: 'many-to-one',
        target: 'impact_risk',
        joinColumn: {
            name: 'ID_IMPACT_RISK',
        },
        onDelete: 'CASCADE'
    },
    riskLevel:{
        type: 'many-to-one',
        target: 'risk_level',
        joinColumn: {
            name: 'ID_RISK_LEVEL'
        },
        onDelete: 'CASCADE'
    },
    heatMap: {
        type: 'many-to-one',
        target: 'heatMap',
        joinColumn: {
            name: 'ID_HEAT_MAP',
        },
        onDelete: 'CASCADE'
    },
  },
});
