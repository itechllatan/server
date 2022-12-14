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
    },
  },
  relations: {
    plansAction: {
      type: 'many-to-one',
      target: 'plans_action',
      joinColumn: {
        name: 'id_plans_action',
      },
      onDelete: 'CASCADE'
    },
    risk: {
      type: 'many-to-one',
      target: 'risk',
      joinColumn: {
        name: 'id_risk',
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
    { columns: ['plansAction', 'risk'] }
  ]
});
