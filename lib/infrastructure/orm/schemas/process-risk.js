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
    },
  },
  relations: {
    process: {
      type: 'many-to-one',
      target: 'process',
      joinColumn: {
        name: 'id_process',
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
  // uniques: [
  //   {columns: [ 'process' , 'risk_heat_map' ]}
  // ]
});
