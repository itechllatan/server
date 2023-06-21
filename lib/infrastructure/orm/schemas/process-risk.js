import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'processRisk',
  tableName: `${config.DB.PREFIX}_PROCESS_RISK`,
  columns: {
    ...baseColumns,
    id_process_risk: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_PROCESS_RISK',
    },
  },
  relations: {
    process: {
      type: 'many-to-one',
      target: 'process',
      joinColumn: {
        name: 'ID_PROCESS',
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
    {columns: [ 'process' , 'risk_heat_map' ]}
  ]
});
