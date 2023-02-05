import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'risk_cause_effect',
  tableName: `${config.DB.PREFIX}_RISK_CAUSE_EFFECT`,
  columns: {
    ...baseColumns,
    id_risk_cause_effect: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    cause_effect: {
      type: 'many-to-one',
      target: 'cause_effect',
      joinColumn: {
        name: 'id_cause_effect',
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
  },
  uniques: [
    {columns: [ 'cause_effect' , 'risk_heat_map' ]}
  ]
});
