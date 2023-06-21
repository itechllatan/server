import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'riskResponsible',
  tableName: `${config.DB.PREFIX}_RISK_RESPONSIBLES`,
  columns: {
    ...baseColumns,
    id_risk_responsible: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_RISK_RESPONSIBLE'
    },
  },
  relations: {
    responsible: {
      type: 'many-to-one',
      target: 'responsibles',
      joinColumn: {
        name: 'ID_RESPONSIBLE',
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
    {columns: [ 'responsible' , 'risk_heat_map' ]}
  ]
});
