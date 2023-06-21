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
      name: 'ID_RISK_CAUSE_EFFECT',
    },
  },
  relations: {
    cause_effect: {
      type: 'many-to-one',
      target: 'cause_effect',
      joinColumn: {
        name: 'ID_CAUSE_EFFECT',
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
  },
  uniques: [
    {columns: [ 'cause_effect' , 'risk_heat_map' ]}
  ]
});
