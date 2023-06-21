import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'risk_variable_frequency',
  tableName: `${config.DB.PREFIX}_RISK_VARIABLE_FREQUENCY`,
  columns: {
    id_risk_variable_frequency: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_RISK_VARIABLE_FREQUENCY',
    },
  },
  relations: {
    riskHeatMap:{
        type: 'many-to-one',
        target: 'risk_heat_map',
        joinColumn: {
            name: 'ID_RISK_HEAT_MAP'
        },
        onDelete: 'CASCADE'
    },
    variable:{
        type: 'many-to-one',
        target: 'variables',
        joinColumn: {
            name: 'ID_VARIABLE'
        },
        onDelete: 'CASCADE'
    },
    frequencyRisk: {
      type: 'many-to-one',
      target: 'frequency_risk',
      joinColumn: {
        name: 'ID_FREQUENCY_RISK'
      },
      onDelete: 'CASCADE'
    },
  },
});
