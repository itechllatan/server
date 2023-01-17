import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'macroprocessRisk',
  tableName: `${config.DB.PREFIX}_MACROPROCESS_RISK`,
  columns: {
    ...baseColumns,
    id_macroprocess_risk: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    macroprocess: {
      type: 'many-to-one',
      target: 'macro_process',
      joinColumn: {
        name: 'id_macro_process',
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
    {columns: [ 'macroprocess' , 'risk_heat_map' ]}
  ]
});
