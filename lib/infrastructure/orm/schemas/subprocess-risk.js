import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'subprocessRisk',
  tableName: `${config.DB.PREFIX}_SUBPROCESS_RISK`,
  columns: {
    ...baseColumns,
    id_subprocess_risk: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_SUBPROCESS_RISK',
    },
  },
  relations: {
    subprocess: {
      type: 'many-to-one',
      target: 'subprocess',
      joinColumn: {
        name: 'ID_SUBPROCESS',
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
    {columns: [ 'subprocess' , 'risk_heat_map' ]}
  ]
});
