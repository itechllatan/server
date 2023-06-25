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
      name: 'ID_MACROPROCESS_RISK'
    },
  },
  relations: {
    macroprocess: {
      type: 'many-to-one',
      target: 'macro_process',
      joinColumn: {
        name: 'ID_MACRO_PROCESS',
      },
      onDelete: 'CASCADE',
      nullable: false,
    },
    risk_heat_map: {
      type: 'many-to-one',
      target: 'risk_heat_map',
      joinColumn: {
        name: 'ID_RISK_HEAT_MAP',
      },
      onDelete: 'CASCADE',
      nullable: false,
    },
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'ID_USER',
      },
      onDelete: 'CASCADE',
      nullable: false,
    },
  },
  uniques: [
    { columns: ['macroprocess', 'risk_heat_map'] }
  ]
});
