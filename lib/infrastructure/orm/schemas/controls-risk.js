import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'controls_risk',
  tableName: `${config.DB.PREFIX}_CONTROLS_RISK`,
  columns: {
    ...baseColumns,
    id_controls_risk: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_CONTROLS_RISK',
    },
    mitigate_impact: {
      type: 'decimal',
      precision: '18,4',
      name: 'MITIGATE_IMPACT',
    },
    mitigate_frequency: {
      type: 'decimal',
      precision: '18,4',
      name: 'MITIGATE_FREQUENCY',
    },
  },
  relations: {
    controls: {
      type: 'many-to-one',
      target: 'controls',
      joinColumn: {
        name: 'ID_CONTROLS',
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
    {columns: [ 'controls' , 'risk_heat_map' ]}
  ]
});
