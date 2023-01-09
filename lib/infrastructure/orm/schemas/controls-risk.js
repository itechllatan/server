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
    },
    mitigate_impact: {
      type: 'decimal',
      precision: '18,4'
    },
    mitigate_frequency: {
      type: 'decimal',
      precision: '18,4'
    },
  },
  relations: {
    controls: {
      type: 'many-to-one',
      target: 'controls',
      joinColumn: {
        name: 'id_controls',
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
  uniques: [
    {columns: [ 'controls' , 'risk_heat_map' ]}
  ]
});
