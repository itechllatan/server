import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'plans_action_risk',
  tableName: `${config.DB.PREFIX}_PLANS_ACTION_RISK`,
  columns: {
    ...baseColumns,
    id_plans_action_risk: {
      primary: true,
      type: 'int',
      generated: true,
      name:'ID_PLANS_ACTION_RISK'
    },
  },
  relations: {
    plansAction: {
      type: 'many-to-one',
      target: 'plans_action',
      joinColumn: {
        name: 'ID_PLANS_ACTION',
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
    {columns: [ 'plansAction' , 'risk_heat_map' ]}
  ]
});
